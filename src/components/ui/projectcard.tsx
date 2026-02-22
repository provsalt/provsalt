import { Star } from "lucide-react";
import { useState, useEffect } from "react";

export interface ProjectCardProps {
	image: string,
	name: string,
	description: string,
	github: string,
}

export const ProjectCard = (props: ProjectCardProps) => {
	const [stars, setStars] = useState<number>(0);

	useEffect(() => {
		const repo = props.github.replace("https://github.com/", "");
		fetch(`https://api.github.com/repos/${repo}`)
			.then(res => res.json())
			.then(data => setStars(data.stargazers_count))
			.catch(() => setStars(0));
	}, [props.github]);

	return (
		<a target="_blank" rel="noopener" href={props.github} className="border border-accent/30 hover:border-accent hover:cursor-grab transition-colors duration-300 px-4 py-12 rounded-xl w-full">
			<img
				src={props.image}
				alt={`Image of ${props.name} project`}
				className="mb-3 w-full aspect-video object-cover rounded"
			/>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="text-xl">{props.name}</p>
					<div className="flex gap-2 text-primary">
						<span>{stars}</span>
						<Star fill="var(--color-primary)" />
					</div>
				</div>
				<p className="text-md">{props.description}</p>
			</div>
		</a>
	)
}
