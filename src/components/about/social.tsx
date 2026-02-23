import { Linkedin, Mail } from "lucide-react";
import { SiDiscord, SiInstagram, SiMatrix, SiTelegram } from "@icons-pack/react-simple-icons";

const contacts = [
	{
		icon: Linkedin,
		website: "https://www.linkedin.com/in/raymond-goo",
		fill: true
	},
	{
		icon: Mail,
		website: "mailto://me@raymond.moe"
	},
	{
		icon: SiDiscord,
		website: "https://discord.com/users/185623219074629632"
	},
	{
		icon: SiTelegram,
		website: "https://t.me/provsalt"
	},
	{
		icon: SiMatrix,
		website: "https://matrix.to/#/@provsalt:matrix.org"
	}
];


export const Social = () => {
	return (
		<div className="flex flex-wrap gap-4">
			{contacts.map(contact => {
				return (
					<a key={contact.website} href={contact.website}>
						<contact.icon size={32} />
					</a>
				)
			})}
		</div>
	)
}