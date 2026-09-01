import { createNextStory } from "@fumadocs/story/next";
import { createMDX } from "fumadocs-mdx/next";

/** @type {import("next").NextConfig} */
const config = {
	allowedDevOrigins: ["dev-box"],
	outputFileTracingIncludes: {
		"/r/*": [
			"./registry.json",
			"./lib/registry.json",
			"./lib/src/biome/base.json",
			"./lib/src/cn.ts",
			"./ui/registry.json",
			"./ui/src/button.tsx",
			"./ui/src/theme.css",
		],
	},
	reactStrictMode: true,
};

const withMdx = createMDX();
const withStory = createNextStory();

export default withStory(withMdx(config));
