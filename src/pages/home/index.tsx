import { Component, lazy, onMount } from "solid-js";
import Experiences from "../../modules/experiences";
import { Footer } from "../../modules/footer";
// import { Hero } from "../../modules/hero";
import Navbar from "../../modules/navbar";

const Hero = lazy(() => import("../../modules/hero/"))

const Home: Component = () => {

	return (
		<>
			<Navbar />
			<div class="">
				<Hero />
				<Experiences />
			</div>
			<Footer />
		</>
	);
};

export default Home;
