export const BLOG_LOCALES = ["en", "ja"] as const;

export type BlogLocale = (typeof BLOG_LOCALES)[number];

export function normalizeBlogLocale(locale: string | undefined): BlogLocale {
	return locale === "ja" ? "ja" : "en";
}

export function formatBlogDate(date: Date, locale: BlogLocale): string {
	return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
		dateStyle: "long",
		timeZone: "UTC",
	}).format(date);
}

interface BlogPostData {
	translationKey: string;
	locale: BlogLocale;
	urlSlug: string;
	title: string;
	description: string;
	pubDate: Date;
	updatedDate?: Date;
	draft: boolean;
	tags: string[];
}

export interface BlogEntry {
	id: string;
	data: BlogPostData;
}

interface PublishedBlogPair<TEntry extends BlogEntry = BlogEntry> {
	translationKey: string;
	pubDate: Date;
	en: TEntry;
	ja: TEntry;
}

interface BlogRssItem {
	title: string;
	description: string;
	pubDate: Date;
	link: string;
	categories: string[];
}

type PartialPair<TEntry extends BlogEntry> = Partial<
	Record<BlogLocale, TEntry>
>;

function getPairPublicationDate(en: BlogEntry, ja: BlogEntry): Date {
	return new Date(Math.max(en.data.pubDate.valueOf(), ja.data.pubDate.valueOf()));
}

export function getPublishedBlogPairs<TEntry extends BlogEntry>(
	entries: readonly TEntry[],
	now: Date = new Date(),
): PublishedBlogPair<TEntry>[] {
	const grouped = new Map<string, PartialPair<TEntry>>();
	const slugOwners = new Map<string, string>();

	for (const entry of entries) {
		const { locale, translationKey, urlSlug } = entry.data;
		const slugKey = `${locale}/${urlSlug}`;
		const slugOwner = slugOwners.get(slugKey);
		if (slugOwner && slugOwner !== translationKey) {
			throw new Error(`Duplicate blog URL slug: ${slugKey}`);
		}
		slugOwners.set(slugKey, translationKey);

		const pair = grouped.get(translationKey) ?? {};

		if (pair[locale]) {
			throw new Error(`Duplicate blog translation: ${translationKey}/${locale}`);
		}

		pair[locale] = entry;
		grouped.set(translationKey, pair);
	}

	const published: PublishedBlogPair<TEntry>[] = [];
	for (const [translationKey, pair] of grouped) {
		const { en, ja } = pair;
		if (!en || !ja || en.data.draft || ja.data.draft) {
			continue;
		}

		const pubDate = getPairPublicationDate(en, ja);
		if (pubDate.valueOf() > now.valueOf()) {
			continue;
		}

		published.push({ translationKey, pubDate, en, ja });
	}

	return published.sort(
		(a, b) =>
			b.pubDate.valueOf() - a.pubDate.valueOf() ||
			a.translationKey.localeCompare(b.translationKey),
	);
}

export function getLocalizedPosts<TEntry extends BlogEntry>(
	pairs: readonly PublishedBlogPair<TEntry>[],
	locale: BlogLocale,
): TEntry[] {
	return pairs.map((pair) => pair[locale]);
}

export function getBlogIndexPath(locale: BlogLocale): string {
	return locale === "ja" ? "/ja/blog/" : "/blog/";
}

export function isSafeBlogSlug(slug: string): boolean {
	return (
		slug !== "." &&
		slug !== ".." &&
		/^[^/?#\\%\s]+$/u.test(slug)
	);
}

export function getBlogPostPath(entry: BlogEntry): string {
	const prefix = entry.data.locale === "ja" ? "/ja" : "";
	return `${prefix}/blog/${entry.data.urlSlug}/`;
}

export function getRssPath(locale: BlogLocale): string {
	return locale === "ja" ? "/ja/rss.xml" : "/rss.xml";
}

export function getAlternatePostPaths(
	pair: PublishedBlogPair,
): Record<BlogLocale, string> {
	return {
		en: getBlogPostPath(pair.en),
		ja: getBlogPostPath(pair.ja),
	};
}

export function getRssItems(
	posts: readonly BlogEntry[],
	site: string | URL,
): BlogRssItem[] {
	return posts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate,
		link: new URL(getBlogPostPath(post), site).href,
		categories: [...post.data.tags],
	}));
}
