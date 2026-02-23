import { Header } from "@/components/ui/header.tsx";
import { useTranslation } from "react-i18next";
import { TravelCard } from "@/components/ui/travelcard.tsx";
import inasayamaImage from "@/images/travels/inasayama.jpg";
import fushimiinariImage from "@/images/travels/fushimiinari.jpg"
import toorcampImage from "@/images/travels/toorcamp.jpg"

export const Travel = () => {
	const {t} = useTranslation();

	const travels = [
		{
			name: t("travels.2025.japan2.name"),
			description: t("travels.2025.japan2.description"),
			image: inasayamaImage.src,
			link: "#"
		},
		{
			name: t("travels.2025.japan1.name"),
			description: t("travels.2025.japan1.description"),
			image: fushimiinariImage.src,
			link: "#"
		},
		{
			name: t("travels.2024.seattle.name"),
			description: t("travels.2024.seattle.description"),
			image: toorcampImage.src,
			link: "#"
		}
	]

	return (
		<section className="flex flex-col gap-8">
			<Header title={t("travel.title")} />
			<div className="flex flex-col md:flex-row gap-4 items-stretch">
				{travels.map(travel => {
					return (
						<TravelCard key={travel.name} image={travel.image} name={travel.name} description={travel.description} link={travel.link} />
					)
				})}
			</div>

		</section>
	)
}