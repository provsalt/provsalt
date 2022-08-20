import {Component, For, JSXElement} from "solid-js";

interface Props {
    links: {
        Name: string,
        Image?: JSXElement,
        Endpoint: string
    }[]
}

export const Links: Component = (props: Props) => {
	return (
		<ul class="menu menu-horizontal p-0 bg-neutral space-x-2 invisible sm:visible">
			<For each={props.links}>
				{(item) =>
					<li>
						<a href={item.Endpoint} class="text-neutral-content">{item.Image} {item.Name}</a>
					</li>
				}
			</For>
		</ul>
	);
};
