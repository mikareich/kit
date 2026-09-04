import { createNextStory } from "@fumadocs/story/next";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMdx = createMDX();
const withStory = createNextStory();

const nextConfig: NextConfig = {
	allowedDevOrigins: ["dev-box"],
	reactStrictMode: true,
};

export default withStory(withMdx(nextConfig));
