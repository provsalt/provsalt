import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import { Social } from "@/components/about/social.tsx";

export const Hero = () => {
	const { t } = useTranslation();
	return (
		<header className="flex flex-col gap-6">

			<div className="flex flex-col gap-4 mb-10">
				<h1 className="text-4xl">{t("hero.title")}</h1>
				<p className="text-xl text-gray-200">{t("hero.description")}</p>
			</div>

			<div className="mb-4">
				<Social />
			</div>

			<div className="flex gap-2">
				<Button asChild size="lg">
					<a href="#code">
						{t("hero.button.primary")}
					</a>
				</Button>
				<Button asChild size="lg" variant="secondary">
					<a href="#about">
						{t("hero.button.secondary")}
					</a>
				</Button>
			</div>
		</header>
	)
}
