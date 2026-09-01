import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/app/_lib/source.ts";

export const { GET } = createFromSource(source, {
	language: "english",
});
