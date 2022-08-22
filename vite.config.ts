import { defineConfig } from "vite";
import solid from "solid-start/vite";

export default defineConfig({
	plugins: [solid({})],
	build: {
		target: "esnext",
	},
	ssr: {
		noExternal: "solid-icons"
	}
});
