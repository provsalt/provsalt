import { Component, lazy, onMount } from "solid-js";
import Contact from "../modules/contact";
import { Footer } from "../modules/footer";
import Navbar from "../modules/navbar";
import Hero from "../modules/hero"

const Experiences = lazy(() => import("../modules/experiences"))

const Home: Component = () => {

	return (
		<>
			<Navbar />
			<div class="">
				<Hero />
				<Experiences />
				<Contact />
			</div>
			<Footer />
		</>
	);
};

export default Home;
