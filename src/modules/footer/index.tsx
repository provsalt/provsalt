// import { SiGithub, SiTwitter, SiYoutube } from "solid-icons/si";
import { Component } from "solid-js";

export const Footer: Component = () => {
  return (
    <footer class="footer items-center p-4 bg-neutral text-neutral-content">
      <div class="items-center grid-flow-col">
        <p>Copyright © 2022 - All right reserved</p>
      </div>
      <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="">
            {/* <SiTwitter /> */}
        </a>
        <a>
            {/* <SiYoutube /> */}
        </a>
        <a>
            {/* <SiGithub /> */}
        </a>
      </div>
    </footer>
  );
};
