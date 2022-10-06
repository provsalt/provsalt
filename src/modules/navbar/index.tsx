import {Component} from "solid-js";
import {Links} from "./links";
// import { SiGithub } from "solid-icons/si";
// import { BsSunFill } from "solid-icons/bs";

const Navbar: Component = () => {
	return (
		<nav class="navbar bg-neutral sticky top-0 z-20">
			<div class="flex-1">
				<a href="/">
					<p class="text-neutral-content">provsalt.me</p>
				</a>
			</div>
			<div class="flex-none">
				<Links links={[
					{
						Name: "Contact me",
						Endpoint: "/Contact"
					}, {
						Name: "Donate",
						Endpoint: "#donate",
					},
					{
						Name: "Github",
						// Image: <SiGithub />,
						Endpoint: "https://github.com/provsalt",
					}]}  />
				<button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" class="btn"><p class="sr-only">Theme</p>Theme{/*<BsSunFill class="text-neutral-content"/>*/}</button>
			</div>
		</nav>
	);
};

export default Navbar;
