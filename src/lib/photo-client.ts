import type { UnsplashPhotoList } from "@/@types/unsplash";

export async function fetchLatestPhotos(
	fetcher: typeof fetch = fetch,
	signal?: AbortSignal,
): Promise<UnsplashPhotoList> {
	const response = await fetcher("/api/photos", { signal });

	if (!response.ok) {
		throw new Error("Unable to load photographs");
	}

	const photos: unknown = await response.json();
	if (!Array.isArray(photos)) {
		throw new Error("Invalid photograph response");
	}

	return photos as UnsplashPhotoList;
}
