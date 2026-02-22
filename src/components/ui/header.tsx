import { Leader } from "@/components/ui/leader.tsx";

export interface HeaderProps {
	title: string
}

export const Header = (props: HeaderProps) => {
	return (
		<div className="flex gap-4">
			<Leader/>
			<h1 className="text-2xl">{props.title}</h1>
		</div>
	)
}