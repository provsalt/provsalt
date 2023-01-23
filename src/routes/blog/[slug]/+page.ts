import { error } from '@sveltejs/kit';
import fs from "fs"

export const load = ({params}: {params: {slug: string}}) => {
	if (!fs.existsSync(`./src/lib/blogs/${params.slug}.md`)) {
		throw error(404, "Not found");
	}
	console.log("Read")
	const file = fs.readFileSync(`./src/lib/blogs/${params.slug}.md`, 'utf8');
	return {
		"content": file
	}
}
export const csr = false