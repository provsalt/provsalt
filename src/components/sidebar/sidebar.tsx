import { changeLocale } from "astro-react-i18next/utils";
import { Globe } from "lucide-react";
import type { BlogLocale } from "@/lib/blog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";

const LANGUAGE_NAMES: Record<BlogLocale, string> = {
	en: "English",
	ja: "日本語",
};

export interface SidebarProps {
	activeLocale: BlogLocale;
	localePaths?: Partial<Record<BlogLocale, string>>;
}

export const Sidebar = ({
	activeLocale,
	localePaths,
}: SidebarProps) => {
	const selectLocale = (value: string) => {
		if (value !== "en" && value !== "ja") {
			return;
		}

		const destination = localePaths?.[value];
		if (destination) {
			window.location.assign(destination);
			return;
		}

		changeLocale(value, false);
	};

	return (
		<div className="absolute right-full top-2 pr-2">
			<Select value={activeLocale} onValueChange={selectLocale}>
				<SelectTrigger
					aria-label={activeLocale === "ja" ? "表示言語" : "Display language"}
					className="min-h-11 min-w-32 justify-center border border-primary/35 bg-background! text-foreground shadow-none focus-visible:ring-primary"
				>
					<Globe aria-hidden="true" className="text-primary" />
					<SelectValue placeholder={LANGUAGE_NAMES[activeLocale]} />
				</SelectTrigger>
				<SelectContent className="z-110">
					<SelectGroup>
						{Object.entries(LANGUAGE_NAMES).map(([key, label]) => (
							<SelectItem key={key} value={key}>
								{label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
