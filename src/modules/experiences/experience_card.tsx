import { Component, Index, JSXElement } from "solid-js";

interface Props {
    name: string,
    image: JSXElement,
    programmingLanguage: string,
    description: string,
    link: string
}

export const ExperienceCard: Component = (props: Props) => {
    return (
        <div class="card lg:card-side bg-base-100 shadow-xl rounded-md">
            <figure class="">
                {props.image}
            </figure>
            <div class="card-body">
                <h2 class="card-title">{props.name}</h2>
                <span>Built with {props.programmingLanguage} </span>
                <p>{props.description}</p>
                <div class="card-actions justify-end">
                    <a class="btn btn-primary" href={props.link}>Check it out!</a>
                </div>
            </div>
        </div>
    )
}