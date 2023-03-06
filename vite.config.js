import { sveltekit } from "@sveltejs/kit/vite";
import { plugin as markdown } from 'vite-plugin-markdown'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), markdown({mode: ['html', "toc"]})],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"]
	},
};

export default config;
