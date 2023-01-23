import { error } from '@sveltejs/kit';
import { Blogs } from "../blog";

export const load = ({params}: {params: {slug: string}}) => {
	for (const Blog in Blogs) {
		if (params.slug === Blogs[Blog].slug) {
			return {
				Blog: Blogs[Blog]
			}
		}
	}
	throw error(404, "Blog does not exist");
}