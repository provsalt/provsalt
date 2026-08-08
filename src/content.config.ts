import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { BLOG_LOCALES, isSafeBlogSlug } from "@/lib/blog";

const blog = defineCollection({
	loader: glob({
		base: "./src/content/blog",
		pattern: "**/*.{md,mdx}",
	}),
	schema: z.object({
		translationKey: z.string().min(1),
		locale: z.enum(BLOG_LOCALES),
		urlSlug: z
			.string()
			.min(1)
			.refine(isSafeBlogSlug, {
				message: "Must be one URL segment without reserved characters",
			}),
		title: z.string().min(1),
		description: z.string().min(1),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { blog };
