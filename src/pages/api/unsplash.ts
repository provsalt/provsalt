export const prerender = false;

const UNSPLASH_API = "https://api.unsplash.com/";
export const GET = async () => {
	const data = await fetch(UNSPLASH_API + "/users/provsalt/photos", {
		headers: {
			"Authorization": "Client-ID " + import.meta.env.UNSPLASH_ACCESS_KEY
		}
	});
	return new Response(
		JSON.stringify(await data.json())
	);
}
