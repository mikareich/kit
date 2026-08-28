import "@kit/ui/theme.css";
import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import { definePreview } from "@storybook/react-vite";

// biome-ignore lint/style/noDefaultExport: expected by storybook
export default definePreview({
	parameters: {
		controls: {
			matchers: {
				color: /(?:background|color)$/iu,
				date: /Date$/iu,
			},
		},
		a11y: {
			test: "todo",
		},
	},
	addons: [addonA11y(), addonDocs()],
	tags: ["autodocs"],
});
