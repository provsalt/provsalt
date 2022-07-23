import { Component } from "solid-js";
import { ExperienceCard } from "./experience_card";

const Experiences: Component = () => {
  return (
    <>
    <p class="text-4xl font-black text-center my-4">Some of my past work</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 bg-neutral gap-1 gap-y-4">
      <ExperienceCard
        name="Dragonfly"
        programmingLanguage="Go"
        description="Dragonfly is a Minecraft: Bedrock edition server sofware made with Go with performance in mind. It's stupidly fast. I've contributed in some of the features and updating the project's code."
        image={<img src="/df.png" />}
        link="https://github.com/df-mc/dragonfly"
      />
      <ExperienceCard 
        name="Euphoria.money auto bond"
        programmingLanguage="Python and Solidity"
        image={<img src="/autobond.png" />}
        description="This took advantage of the cheap bonds which used to be enabled and helped you automatically stake your bonds right before an epoch (every 8 hours) to maximize the rewards you earn."
        link="https://github.com/provsalt/wagmi-autobond"
      />
      <ExperienceCard 
        name="LightningDeath"
        programmingLanguage="PHP and Java"
        description="Self explanatory plugin when a player dies, a lightning spawns. This was created for a user on the PocketMine-MP forums years ago when I started actively writing code. It was later ported to nukkit and java was used to write it."
        image={<img src="/lightning.png" />}
        link="https://github.com/provsalt/lightningdeath"
      />
      <ExperienceCard
        name="XMRvsBeast beautified"
        programmingLanguage="Typescript"
        description="During my Summer break, I got bored and decided to put up a website for a Monero mining pool website that I used to mine at. The owner was also extreemly generous and offered me some monero in exchange"
        image={<img class="w-5/6" src="/beast.png" />}
        link="https://github.com/provsalt/lightningdeath"
      />
    </div>
    </>
  );
};

export default Experiences;
