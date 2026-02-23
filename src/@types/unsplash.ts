interface AlternativeSlugs {
	en: string;
	es: string;
	ja: string;
	fr: string;
	it: string;
	[key: string]: string; // other locales
}

interface PhotoLinks {
	self: string;
	html: string;
	download: string;
	download_location: string;
}

interface PhotoUrls {
	raw: string;
	full: string;
	regular: string;
	small: string;
	thumb: string;
	small_s3?: string;
}

interface UserLinks {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
	following: string;
	followers: string;
}

interface ProfileImage {
	small: string;
	medium: string;
	large: string;
}

interface User {
	id: string;
	updated_at: string;
	username: string;
	name: string;
	first_name: string;
	last_name: string | null;
	twitter_username: string | null;
	portfolio_url: string | null;
	bio: string | null;
	location: string | null;
	links: UserLinks;
	profile_image: ProfileImage;
	instagram_username: string | null;
	total_collections: number;
	total_likes: number;
	total_photos: number;
	total_promoted_photos: number;
	total_illustrations: number;
	total_promoted_illustrations: number;
	accepted_tos: boolean;
	for_hire: boolean;
	social: {
		instagram_username: string | null;
		portfolio_url: string | null;
		twitter_username: string | null;
		paypal_email: string | null;
	};
}

interface UnsplashPhoto {
	id: string;
	slug: string;
	asset_type: 'photo' | 'illustration' | 'video';
	created_at: string;
	updated_at: string;
	promoted_at: string | null;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	description: string | null;
	alt_description: string | null;
	breadcrumbs: unknown[];
	urls: PhotoUrls;
	links: PhotoLinks;
	likes: number;
	liked_by_user: boolean;
	bookmarked: boolean;
	pinned: boolean | null;
	current_user_collections: unknown[];
	sponsorship: unknown | null;
	topic_submissions: Record<string, unknown>;
	alternative_slugs: AlternativeSlugs;
	user: User;
}

export type UnsplashPhotoList = UnsplashPhoto[];

