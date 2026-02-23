import { Header } from "@/components/ui/header.tsx";
import { useTranslation } from "react-i18next";
import Masonry from "react-masonry-css";
import type { UnsplashPhotoList } from "@/@types/unsplash.ts";

export const Photograph = ({photos} : {photos: UnsplashPhotoList}) => {
	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1
	};
	const {t} = useTranslation();
	return (
		<section className="flex flex-col gap-8">
			<Header title={t("photo.title")} />

			<Masonry className="flex gap-4 flex-col md:flex-row" breakpointCols={breakpointColumnsObj} columnClassName="space-y-4">
				{
					!photos ? "Couldn't load images" : photos.map((photo, i) => {
						if (i > 15) return;
						return (
							<img loading="lazy" decoding="async" src={photo.urls.thumb} alt={photo.alt_description ?? "Photo"} className="object-fill w-full rounded-sm" />
						)
					})
				}
			</Masonry>

			<div className="flex justify-center">
				<a target="_blank" className="border-b-2 border-accent" href="https://unsplash.com/@provsalt">{t("photo.unsplash")}</a>
			</div>

		</section>
	)
}