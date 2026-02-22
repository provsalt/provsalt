// TODO: Refactor this. too lazy rn

export interface TravelCardProps {
	image: string,
	name: string,
	description: string,
	link: string
}

export const TravelCard = (props: TravelCardProps) => {
	return (
		<a href={props.link} className="border border-accent md:border-accent/30 hover:border-accent transition-colors duration-300 px-4 py-12 rounded-xl w-full">
			<img
				src={props.image}
				alt={`Picture of me travelling in ${props.name}`}
				className="mb-3 w-full aspect-square object-cover rounded-2xl"
			/>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-xl">{props.name}</p>
				</div>
				<p className="text-md">{props.description}</p>
			</div>
		</a>
	)
}
