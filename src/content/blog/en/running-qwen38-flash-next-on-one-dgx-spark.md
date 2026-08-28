---
translationKey: running-qwen38-flash-next-on-one-dgx-spark
locale: en
urlSlug: running-qwen38-flash-next-on-one-dgx-spark
title: "I made Qwen3.8-Flash-Next fit on one DGX Spark"
description: "Qwen3.8-Flash-Next has a 51-billion-parameter n-gram table. I packed it into NVFP4, kept the model intact, and served it through vLLM on one DGX Spark."
pubDate: 2026-08-28
draft: false
tags:
  - AI
  - Qwen
  - vLLM
  - NVIDIA
  - open source
---

Yes, I know. My previous AI post was called [The current state of AI and why I hate it](https://raymond.moe/blog/why-ai-usage-has-become-problematic), and now I have spent an unreasonable amount of time trying to run a 180-billion-parameter model on a tiny desk computer.

I still hate treating AI like magic that fixes every product. I do, however, enjoy the engineering behind making a ridiculous model run on hardware that it barely fits into.

[Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) is an early preview of the architecture Qwen is developing for Qwen4. The main model has 125 billion parameters, around 6 billion are active for each token, and there is also a 4-billion-parameter MTP head. Then Qwen added a 51-billion-parameter n-gram embedding table because apparently 129 billion parameters were not enough.

The exact official safetensors count is 179,999,981,459 values, so calling it a 180B model is close enough. My conversion keeps all of them. Hugging Face displays around 93B parameters because packed NVFP4 bytes and their scales do not map cleanly to the logical parameter count.

## So... why is the checkpoint so large?

The n-gram table is called the position-learning enhancement, or PLE. It contains roughly 20 million bigram and trigram rows with a width of 2,560. Qwen looks up a small number of those rows while processing a request instead of multiplying through all 51.2 billion values.

This is quite a clever way to add model capacity without adding the compute cost of another 51 billion dense parameters. Unfortunately, a parameter that does not use FLOPs can still ruin your day by using memory.

I started with [Inferact's ModelOpt NVFP4 checkpoint](https://huggingface.co/Inferact/Qwen3.8-Flash-Next-NVFP4). On my first look at the architecture, I mentally grouped it as roughly 135B of normal model weights with the 51B n-gram table added on top. The complete checkpoint was 170.189 GiB.

My [DGX Spark](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) has 128 GB of unified memory. Even if I politely asked vLLM to use no KV cache, no workspaces, and no memory for Python existing, a 170 GiB checkpoint was obviously not going to fit.

## Why I reached for REAP first

The roughly 135B main model looked like the obvious target. I assumed a checkpoint called NVFP4 had already quantized everything important, including the n-gram table. That left the MoE experts as the part I could still shrink.

My first plan was to remove 25% of the experts. I thought REAP would be what pushed the checkpoint under the Spark's memory limit.

Then I inspected the safetensors index and the PLE shards.

That was when the original plan fell apart. Inferact had already quantized the model backbone to NVFP4, but it had not quantized the n-gram table. All 51.2 billion PLE values were still BF16 across 128 separate shards. The table alone occupied 102,400,491,520 bytes, or 95.368 GiB.

The part I planned to prune was already compressed. The part I assumed was compressed took almost 100 GiB by itself.

This changed the question. REAP could still save more memory, but I no longer needed to remove experts just to make the raw checkpoint fit. Quantizing the overlooked PLE table might be enough.

I had already started adding Qwen's new `qwen4_exp` architecture to REAP, so I still wanted to measure whether pruning improved the final candidate. I built a controlled alignment harness with 32 mixed calibration prompts and eight separate held-out prompts. We compared 236 next-token positions against the official FP8 model with its normal PLE behavior.

| Change | Top-1 agreement | Reference top-1 in candidate top-5 | KL divergence | Logit cosine |
|---|---:|---:|---:|---:|
| NVFP4 PLE only | 91.525% | 100.000% | 0.015591 | 0.995399 |
| REAP only, 25% removed | 87.712% | 100.000% | 0.042569 | 0.991027 |
| REAP and NVFP4 PLE | 91.102% | 99.576% | 0.040298 | 0.990824 |

This comparison answered the question I cared about: which change kept the model closest to the reference?

PLE-only NVFP4 stayed closer to the reference than removing 25% of the experts. Combining REAP with NVFP4 did not improve top-1 agreement, and its KL divergence was more than twice as large as PLE-only.

That made the release decision easy. I dropped REAP. The released checkpoint keeps every expert and only changes how the PLE table is stored.

## The PLE table did not need to stay BF16

PLE is a table lookup. The rest of the model only needs the selected rows in BF16. There is no reason to keep all 51.2 billion values expanded in BF16 while most rows sit there doing absolutely nothing for a request.

I packed every pair of PLE values into one byte using NVFP4 E2M1 values. Every group of 16 values gets an E4M3 block scale, and each of the 128 original PLE shards gets one FP32 global scale.

That works out to half a byte for each packed value plus one sixteenth of a byte for its block scale. The result is 3.5555 times smaller than BF16.

| Artifact | Exact bytes | GiB |
|---|---:|---:|
| Original BF16 PLE table | 102,400,491,520 | 95.368 |
| NVFP4 PLE table | 28,800,138,752 | 26.822 |
| Original complete checkpoint | 182,738,792,440 | 170.189 |
| Converted complete checkpoint | 109,138,439,672 | 101.643 |
| Unsloth UD-Q4_K_XL GGUF with F16 multimodal projector | 112,238,658,784 | 104.530 |

The conversion saved 68.546 GiB without changing the backbone or removing experts. That brought the checkpoint under the DGX Spark's memory limit.

The runtime path is fairly small:

~~~text
token IDs -> Qwen n-gram hashing -> packed row lookup
          -> NVFP4 decode to BF16 -> vLLM GPU buffer
~~~

The full PLE table remains packed in CPU-owned memory. The plugin gathers only the requested rows, decodes those rows to BF16, and hands them back to the existing vLLM code. Attention, MoE, sampling, scheduling, and multimodal processing remain upstream.

## Getting it into vLLM was the annoying part

Qwen3.8-Flash-Next is new enough that the normal vLLM image and PyPI release do not contain its architecture. NVIDIA published a dedicated day-zero vLLM image, and I pinned the exact digest I tested.

I also did not want to maintain a fork of a Qwen4 preview model that will probably change several times before Qwen4 is even released. The project uses a vLLM general plugin that replaces only the PLE embedding class.

There was one catch. vLLM runs the CPU-offloaded PLE table in a special child process, and that process does not load normal plugins. The plugin therefore wraps the PLE process entry point, registers itself inside the child, and then returns control to vLLM.

There were a few fun errors along the way.

At tensor parallel size one, vLLM selected its single-process executor. That executor never spawned the PLE worker, so the packed table could not load. The server must use the `mp` executor even with one GPU.

I also tried an FP8 KV cache because saving memory sounded sensible. Qwen Sparse Attention immediately replied with:

~~~text
NotImplementedError: Qwen3.8-Flash-Next QSA requires a BF16 main KV cache
~~~

Fair enough. The final setup leaves the main KV cache in BF16.

## Running it on one DGX Spark

The physical 101.643 GiB checkpoint loaded on one NVIDIA GB10 with tensor parallel size one.

The full multimodal run reported 73.97 GiB during model loading and reserved a 2 GiB KV cache. The packed 26.822 GiB PLE table stayed in the CPU worker, but the GB10 CPU and GPU use the same physical LPDDR5x memory pool. API startup took about 639 seconds.

Yes, waiting more than ten minutes for an API server is painful. At least it started.

After image and text requests, the machine had 19.8 GiB available and 14.0 GiB of system-wide swap in use. The model fits, but the machine is tight on memory.

For the multimodal test, I generated an image of a person standing on the Moon without a spacesuit and asked Qwen what it saw.

![A man in a T-shirt and jeans standing on the Moon with Earth in the black sky](../../../assets/blog/running-qwen38-flash-next-on-one-dgx-spark/person-on-moon-no-spacesuit.png)

Qwen's completed three-sentence response was:

> The scene is set on the barren, rocky surface of the Moon, with Earth hanging in the black sky above. The man stands casually in everyday clothes — a dark t-shirt, jeans, and sneakers — with no spacesuit or protective gear. What makes it unusual is that he’s unharmed and relaxed despite being exposed to the Moon’s vacuum, extreme temperatures, and radiation — conditions instantly lethal to humans without equipment.

It identified the Moon-like surface, Earth in the background, the person's casual clothing, and the missing spacesuit. It even noticed the important problem: the man should be dead.

I also tested video input through the same OpenAI-compatible endpoint, and it worked.

## Is it fast?

Not really, but it is usable.

I ran [llama-benchy](https://github.com/eugr/llama-benchy) against the OpenAI-compatible vLLM endpoint with prefix caching, three-token MTP speculative decoding, a 2,048-token prompt test, a 128-token generation test, and context depths through 100,000 tokens.

| Test | Concurrency | Throughput |
|---|---:|---:|
| 2,048-token prompt processing | 1 | 1,410.5 tokens/s |
| 128-token generation | 1 | 24.1 tokens/s |
| 128-token generation | 10 | 45.2 aggregate tokens/s |
| Generation after 100,000-token context | 1 | 21.8 tokens/s |

The 100,000-token context build took about 69.7 seconds before generation. At concurrency ten, the 45.2 aggregate tokens per second worked out to only 7.6 tokens per second for the average request.

My first benchmark pass died from memory pressure. I added a separate 32 GiB swap file, restarted the server, and ran it again. The benchmark completed. Swap makes the machine survive. It does not make the machine fast, and the high-concurrency results got ugly at larger context sizes.

I knew about the [Unsloth GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) before I started this. Its four-bit UD-Q4_K_XL release is 103.688 GiB for the model files and 104.530 GiB with the F16 multimodal projector. That is close to my 101.643 GiB checkpoint.

The difference is how I wanted to run it. Unsloth targets llama.cpp and I believe it would be faster if I kept everything in NVFP4 with MTP.

## Making it reusable

I split the release into three parts because putting everything into one Hugging Face repository would be a mess.

The [Hugging Face model](https://huggingface.co/provsalt/Qwen3.8-Flash-Next-NVFP4-PLE-NVFP4) contains only the converted weights, tokenizer, configuration, and license. It is 101.643 GiB and keeps Inferact's NVFP4 backbone unchanged.

The [GitHub repository](https://github.com/provsalt/qwen3.8-flash-ple-nvfp4) contains the converter, vLLM plugin, Dockerfile, and Compose setup. The converter is resumable, validates completed shards, and can hardlink the unchanged checkpoint files instead of copying another 74.8 GiB for no reason.

The [public GHCR package](https://github.com/users/provsalt/packages/container/package/qwen3.8-flash-ple-nvfp4) contains the pinned vLLM runtime and plugin. It links back to the source repository and preserves the normal `vllm serve` entry point.

The published single-Spark profile can be started with Compose:

~~~bash
git clone https://github.com/provsalt/qwen3.8-flash-ple-nvfp4
cd qwen3.8-flash-ple-nvfp4
docker pull ghcr.io/provsalt/qwen3.8-flash-ple-nvfp4:latest
VLLM_IMAGE=ghcr.io/provsalt/qwen3.8-flash-ple-nvfp4:latest \
  docker compose up --detach
docker compose logs --follow api
~~~

The first launch still needs to download a checkpoint larger than 100 GiB, so do not stare at the terminal wondering why it has not started after two minutes.

I also put the endpoint behind LiteLLM. My first request returned a 404 because I forgot the `/v1` part of the base URL, which was a much less interesting problem than anything above. Once that was fixed, it behaved like any other OpenAI-compatible model.

## Where it landed

I converted the PLE table, loaded the resulting checkpoint, generated text, processed images and video, and served the model through vLLM on one DGX Spark. The alignment results also made the release choice clear: PLE-only NVFP4 stayed closer to the reference than the tested 25% REAP pruning.

This project started with the question, "Can I use REAP and NVFP4 to make it fit?" The answer ended up being better than the question.

Don't prune the experts. Quantize the enormous table that behaves like memory.

I still hate the AI hype train, but I have to admit that having access to such a crazy model locally is something that we never thought about back in the days of GPT-3's release.
