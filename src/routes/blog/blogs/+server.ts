import type { RequestEvent } from "@sveltejs/kit";
import { json, error } from "@sveltejs/kit";
import { Blogs } from "../blog";
import fs from "fs";

export function GET({ url }: RequestEvent) {
	const offset = Number(url.searchParams.get("offset") ?? "0");
	const limit = Number(url.searchParams.get("limit") ?? "5");

	if (isNaN(offset) || offset < 0) {
		error(400, "Invalid offset");
	}
	if (isNaN(limit) || limit < 1 || limit > 100) {
		error(400, "Invalid limit");
	}
	return json(
		Blogs.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		}).slice(offset, offset + limit)
	);
}
