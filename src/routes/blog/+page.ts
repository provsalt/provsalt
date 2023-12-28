import type { LoadEvent } from "@sveltejs/kit";

export async function load(event: LoadEvent) {
	return {
		blogs: await event.fetch("/blog/blogs?limit=100").then((res) => {
		return res.json();
	})
	}
}