---
translationKey: "why-ai-usage-has-become-problematic"
locale: "en"
urlSlug: "why-ai-usage-has-become-problematic"
title: "The current state of AI and why I hate it"
description: "Some of my biggest gripes with people talking about AI hype train"
pubDate: "2025-01-04"
draft: false
tags:
  - AI
  - programming
  - opinion
---

## Why I personally dislike the AI hype
I would like to preface this that I genuinely think that there's good use of generative AI however, it seems like nowadays there cannot be a day the word AI being passed around like a verb that could magically fix everything.

I have been actually thinking of ranting about this for the longest time, but I think I've gotten to annoyed to not write about it.

AI CANNOT fix everything and companies know it, but why are we forcing everyone to use AI at every step in the process. Personally I feel like this could be greed, but other than making shareholders happy, and venture capitalist throw money into your next startup, there is just no good reason why we're dumping a bunch of GPUs and electricity in something that is not even AGI and can't even solve simple problems that takes a human a second to compute.

Now, let me get into reasons why I've been trying to restrict myself into using AI or the so-called artificial intelligence.

## It makes you dumber - literally
Over the past few years, I've been a really loyal GitHub Copilot user with the extension always enabled ever since it launched, however I've realized that this may not be the best idea at all since it starts making you reliant on the tool, and not your skills.

This kind of creates a brain drain problem where you're more likely than not to rely on pressing tab for autocompletion. In regard to the classic autocompletion like intellisense however, you don't have to spend an effort trying to pick which of the item you want to autocomplete in your IDE. Simply put, you're not really thinking about what you really write, rather, you would end up being a code reviewer for an AI that may produce results that you may not like.

I think this issue is even worse for people that are getting into coding it's what I would like to call "Call the AI" where when a problem occurs, and you have no idea how to solve it, just ask the AI to fix it for you.

It's not necessarily a bad thing per-se. It helps clear up my DMs with people that don't really know how to prompt a traditional search engine and that's where a LLM shines. You can use natural language that does not involve fiddling with the search engine.

For example if I have a syntax error problem in golang before AI I would type this into my search engine

*"syntax error golang debug"*

Whereas now, I would just paste the whole error into a LLM and ask it why is there an error, and usually it will identify what it is.

The problem is that you wouldn't even want to read the error and stack trace if all you have to do is just paste the whole thing in and let the AI figure it out. This is what I would like to call mindless problem-solving. It involves basically zero interaction, zero critical thinking to figure out how can I prevent this and fix this by my own next time. People might disagree with me and what not, but have you seen someone try and understand what the LLM really is explaining when you understand almost nothing? It's almost like trying to read a foreign language without understanding anything for a beginner/junior dev.

Yes, I have encountered someone who prompted chatgpt to ask it to write a hello world when they're a dev with almost zero experience. I'm pretty sure you can figure this out in 5 minutes with the documentation.

According to the [2024 stackoverflow survey](https://survey.stackoverflow.co/2024/ai#sentiment-and-usage-ai-sel-learn) over 63% of responders learning to code are using AI to help them and this in my opinion will become like the iPad generation where they are unable to operate a computer properly anymore.

People are just not as interested in reading more, especially students, I find that some stuff could be learnt from LLMs like chain of thought where you actively ask yourself why, and how something is implemented and not just copy and paste code blindly from chatgpt or **insert new LLM that codes better**

I might be one of those old teachers who may say you can't have a calculator everywhere you go and get proven wrong in the future, but I think it's critical that someone at least posses the ability to troubleshoot this is what makes a good software engineer valued, just like how those human calculators are highly valued for their profession.

One of the most egregious examples I have is when I tried to troubleshoot a performance issue I had in three.js which was REALLY simple, but I ran it through a LLM as it's great with detecting patterns of anomaly except for this one...

```js
  const clock = new THREE.Clock();
  const fps = 60;
  const interval = 1000 / fps;
  let lastTime = 0;

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now();
    if (time - lastTime >= interval) {
      lastTime = time;
      controls.update();
      renderer.render(scene, camera);
    }

    const deltaTime = clock.getDelta();

    if (gameState.mixer) {
      gameState.mixer.update(deltaTime);
    }

    if (gameState.character) {
      characterMovement(deltaTime);
      updatePhysics(deltaTime, ground, groundBody, hitboxMesh);
    }
  }
```

Looks normal right? wrong. The problem was with the logic of the if statement comparing the last time to the interval however, it's a rookie mistake where the other functions that do not need to update, still updates even though the interval has not been met.

No, chatgpt and claude were unable to figure this out. As I depended quite heavily on AI, I didn't really bother trying to solve it myself first, trying to prompt the AI to eventually "fix" it for me. But after an hour without luck, I decided to run the profiler myself and figured out the error was in the animate loop.

I'm glad to say however, I did not write this bad code that invoked updatePhysics which was crazy demanding on intervals we shouldn't render. I would have realized how painfully slow it ran before I pushed to git.

So my takeaway with this example shall be, do not spend 1 hour trying to prompt the AI to go the right way. Something as simple as moving if statements LLM are unable to do.

## People value AI too much
As I've mentioned previously, people value the current state of AI way too much. Most of them have no idea how a neural network even work on surface. I'm not as knowledgeable on this topic, but it is enough to remind me how I shouldn't really trust it. Especially not in the terminal without confirming if it's safe or not. What I can say up with the AI hype is it's almost like the crypto hype where the crypto bros and the AI bros have no idea what they're talking about in the field of AI and crypto

There are always the type of people on Twitter or anywhere online actually that would like to claim that software engineers are not required anymore and everyone should use devin or whatever the new trend for AI agents are. It's just simply not the case, and if you have watched theprimeagen on [using devin](https://www.youtube.com/watch?v=QOJSWrSF51o)

> It was extremely entertaining to watch this, if you have the time please do watch this 2-hour video.

I think the above video speaks a lot about the nature of AI, it hallucinates, there is no way you can solve this with the current technology.

Another rant from me, people are talking about o3, the model from openai and calling it agi, but it's just not agi even though it can pass some of the agi benchmarks

Some project managers are also really out of touch with coding because they're really not technical people y'know and what happens is they expect you to create a chatgpt clone has it's capabilities with your own data in less than 10 story points

People just have to stop acting like this is a live or die situation, it's just going to be like the gold rush where people who sell your data, or sell the chips, will be the people who are winning. Take your time, and implement it in a good non-invasive way where I don't have to be forced to notice that there's a new AI feature whenever I update windows. All I need is AI being done so well that I do not even notice that it's an AI. We really don't need another half-baked chatgpt wrapper.

The day when AGI has come is the day when an AI company will fire all of their employees and replace with their own "capable" AI and there is simply no way this would happen anytime soon in the next 5 years.

## Conclusion
Hopefully this wasn't too much of a long rant, I think most of my reasoning are widely shared in the developer community, I'm just here to broadcast my own voice about this AI trend and I really hope it dies off once the money dries up.

Oh, wait who am I kidding, the industry just simply will not stop calling everything AI even though a product has nothing related to AI.

I am on my journey of reducing my dependence on AI tools however, it's just been such a habit that it's really hard to quit as if it was drugs. I hope this post has convinced people to reduce their AI usage to a minimal or even stop using it all together. It would really be great if we had a movement on stopping AI before the whole internet turns into AI.
