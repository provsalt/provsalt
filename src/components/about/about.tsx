import { Header } from "@/components/ui/header.tsx";
import { useTranslation } from "react-i18next";
import { DateTime } from 'luxon';
import { useEffect, useState } from "react";
import { Social } from "@/components/about/social.tsx";
import aboutImage from "@/images/me/about.png"

export const About = () => {
	const {t, i18n} = useTranslation();

	const birthDate = DateTime.fromISO("2006-03-24");
	const formattedDob = birthDate.setLocale(i18n.language).toLocaleString(DateTime.DATE_FULL);
	const [age, setAge] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const calculated = DateTime.now().diff(DateTime.fromISO("2006-03-24"), 'years').years;
			setAge(calculated.toFixed(7));
		}, 100);

		return () => clearInterval(interval);
	}, []);
	return (
		<section id="about" className="flex flex-col gap-8">
			<div className="flex flex-col-reverse md:flex-row gap-6">
				<div className="flex flex-col gap-8 w-full">
					<Header title={t("about.title")} />
					<div className="flex flex-col gap-3 text-md md:text-lg">
						{t('about.intro', { dob: formattedDob, age })
							.split('\n')
							.map((line, i) => <p key={i}>{line}</p>)}
					</div>
					<Social />
				</div>
				<img
					className="w-full md:w-1/2 lg:w-2/5 aspect-square object-cover rounded-lg"
					src={aboutImage.src}
					alt="Picture of myself at a concert"
				/>
			</div>
		</section>
	);
}