import type { APIRoute } from "astro";

export const prerender = false;

const UNSPLASH_PHOTOS_URL = "https://api.unsplash.com/users/provsalt/photos";
const SUCCESS_HEADERS = {
	"Cache-Control": "public, max-age=0, must-revalidate",
	"Vercel-CDN-Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
};
const FAILURE_HEADERS = {
	"Cache-Control": "no-store",
};

export const GET: APIRoute = async () => {
	try {
		const response = await fetch(UNSPLASH_PHOTOS_URL, {
			headers: {
				Authorization: `Client-ID ${import.meta.env.UNSPLASH_ACCESS_KEY}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Unsplash responded with ${response.status}`);
		}

		const photos: unknown = await response.json();
		if (!Array.isArray(photos)) {
			throw new Error("Unsplash returned an invalid photograph response");
		}

		return Response.json(photos, { headers: SUCCESS_HEADERS });
	} catch {
		return Response.json(
			{ error: "Unable to load photographs" },
			{ status: 502, headers: FAILURE_HEADERS },
		);
	}
};
