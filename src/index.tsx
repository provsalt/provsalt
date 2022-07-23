/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import {Router, useLocation, useRoutes} from "solid-app-router";
import { Component, onMount } from "solid-js";
import Navbar from "./modules/navbar";
import {routes} from "./utils/routes";
import { themeChange } from 'theme-change'	

const Index: Component = () => {
	onMount(() => {
		themeChange(false)
	})
	
	const Route = useRoutes(routes);

	return (
		<Router>
			<main>
				<Route />
			</main>
		</Router>
	);
};

render(() => <Index />, document.getElementById("root") as HTMLElement);
