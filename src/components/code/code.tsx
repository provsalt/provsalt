import { Header } from "@/components/ui/header.tsx";
import { useTranslation } from "react-i18next";
import { ProjectCard } from "@/components/ui/projectcard.tsx";

export const Code = () => {
	const {t} = useTranslation()
	const projects = [
		{
			"name": t("code.projects.soramail.name"),
			"image": "/images/projects/soramail.gif",
			"description": t("code.projects.soramail.description"),
			"github": "https://github.com/provsalt/soramail"
		},
		{
			"name": t("code.projects.8cbc.name"),
			"image": "/images/projects/8cbc.png",
			"description": t("code.projects.8cbc.description"),
			"github": "https://github.com/provsalt/8CBC"
		},
		{
			"name": t("code.projects.website.name"),
			"image": "/images/projects/website.png",
			"description": t("code.projects.website.description"),
			"github": "https://github.com/provsalt/provsalt"
		}
	]
	return (
		<section id="code" className="flex flex-col gap-8">
			<Header title={t("code.title")} />
			<div className="flex flex-col md:flex-row gap-4 items-stretch">
				{projects.map(p => {
					return (
						<ProjectCard key={p.name} image={p.image} name={p.name} description={p.description} github={p.github} />
					)
				})}
			</div>
			<div className="flex justify-center">
				<a className="border-b-2 border-accent" href="https://github.com/provsalt">{t("code.github")}</a>
			</div>
		</section>
	)
}