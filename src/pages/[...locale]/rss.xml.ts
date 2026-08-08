import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import i18next from "i18next";
import {
	getLocalizedPosts,
	getPublishedBlogPairs,
	getRssItems,
	type BlogLocale,
} from "@/lib/blog";

interface Props {
	locale: BlogLocale;
}

export const getStaticPaths: GetStaticPaths = () => [
	{ params: { locale: undefined }, props: { locale: "en" } satisfies Props },
	{ params: { locale: "ja" }, props: { locale: "ja" } satisfies Props },
];

export const GET: APIRoute<Props> = async ({ props, site }) => {
	const entries = await getCollection("blog");
	const pairs = getPublishedBlogPairs(entries);
	const posts = getLocalizedPosts(pairs, props.locale);
	const t = i18next.getFixedT(props.locale);
	const feedSite = site ?? new URL("https://raymond.moe");

	return rss({
		title: t("blog.rssTitle"),
		description: t("blog.archiveDescription"),
		site: feedSite,
		items: getRssItems(posts, feedSite),
		customData: `<language>${props.locale}</language>`,
		trailingSlash: true,
	});
};
