import "@/ui/theme.css";
import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import { definePreview } from "@storybook/react-vite";

// biome-ignore lint/style/noDefaultExport: expected by storybook
export default definePreview({
	addons: [addonA11y(), addonDocs()],
	parameters: {
		a11y: {
			test: "todo",
		},
		controls: {
			matchers: {
				color: /(?:background|color)$/iu,
				date: /Date$/iu,
			},
		},
	},
	tags: ["autodocs"],
});
