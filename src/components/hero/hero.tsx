import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";

export const Hero = () => {
	const { t } = useTranslation();
	return (
		<main className="flex flex-col gap-6">

			<div className="flex flex-col gap-4 mb-10">
				<p className="text-4xl">{t("hero.title")}</p>
				<p className="text-xl text-gray-200">{t("hero.description")}</p>
			</div>

			<div className="flex gap-2">
				<Button size="lg">{t("hero.button.primary")}</Button>
				<Button size="lg" variant="secondary">{t("hero.button.secondary")}</Button>
			</div>
		</main>
	)
}