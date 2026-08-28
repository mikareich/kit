import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineMain } from "@storybook/react-vite/node";

function getAbsolutePath(value: string): string {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

// biome-ignore lint/style/noDefaultExport: expected by storybook
export default defineMain({
	addons: [
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/addon-vitest"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-docs"),
	],
	core: {
		allowedHosts: ["dev-box"],
	},
	docs: {},
	framework: getAbsolutePath("@storybook/react-vite"),
	stories: ["../stories/**/*.mdx", "../stories/**/*.story.tsx"],
});
