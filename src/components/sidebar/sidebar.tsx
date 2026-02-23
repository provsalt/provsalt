import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Globe } from "lucide-react";
import { changeLocale } from "astro-react-i18next/utils";

export const Sidebar = () => {
	const {i18n} = useTranslation();
	const langKey = {
		"en": "English",
		"ja": "Japanese"
	}
	return (
		<div className="absolute right-full top-2">
			<Select onValueChange={(value) => {
				changeLocale(value, false)
			}}>
				<SelectTrigger className="bg-background! text-foreground flex justify-center border-none shadow-none">
					<Globe className="text-foreground" />
					<SelectValue className="text-primary" placeholder={langKey[i18n.language as "ja" | "en"] } />
				</SelectTrigger>
				<SelectContent className="z-110">
					<SelectGroup>
						{
							Object.entries(langKey).map(([key, value], i) => (<SelectItem key={i} value={key}> {value}</SelectItem>))
						}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}