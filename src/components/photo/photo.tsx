import { Header } from "@/components/ui/header.tsx";
import { useTranslation } from "react-i18next";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import type { UnsplashPhotoList } from "@/@types/unsplash.ts";
import { fetchLatestPhotos } from "@/lib/photo-client";

const BREAKPOINT_COLUMNS = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
};

export const Photograph = () => {
	const [photos, setPhotos] = useState<UnsplashPhotoList>([]);
	const { t } = useTranslation();

	useEffect(() => {
		const controller = new AbortController();

		fetchLatestPhotos(fetch, controller.signal)
			.then(setPhotos)
			.catch(() => {
				// Keep any currently displayed photos when the refresh is unavailable.
			});

		return () => controller.abort();
	}, []);

	return (
		<section className="flex flex-col gap-8">
			<Header title={t("photo.title")} />

			<Masonry
				className="flex flex-col gap-4 md:flex-row"
				breakpointCols={BREAKPOINT_COLUMNS}
				columnClassName="space-y-4"
			>
				{photos.slice(0, 16).map((photo) => (
					<img
						key={photo.id}
						loading="lazy"
						decoding="async"
						src={photo.urls.small}
						alt={photo.alt_description ?? "Photo"}
						className="w-full rounded-sm object-fill"
					/>
				))}
			</Masonry>

			<div className="flex justify-center">
				<a
					target="_blank"
					className="border-b-2 border-accent"
					href="https://unsplash.com/@provsalt"
				>
					{t("photo.unsplash")}
				</a>
			</div>
		</section>
	);
};
