import { defineStory } from "@/app/_lib/story.ts";
import { ButtonStory } from "@/ui/button.story-client.tsx";

export const buttonStory = defineStory({
	args: [
		{
			initial: {
				asChild: false,
				disabled: false,
				label: "Button",
				loading: false,
				mode: "filled",
				showIcons: true,
			},
			variant: "Default",
		},
		{
			fixed: {
				mode: "outlined",
			},
			initial: {
				disabled: false,
				label: "Outlined Button",
				loading: false,
				showIcons: true,
			},
			variant: "Outlined",
		},
		{
			fixed: {
				mode: "ghost",
			},
			initial: {
				disabled: false,
				label: "Ghost Button",
				loading: false,
				showIcons: true,
			},
			variant: "Ghost",
		},
		{
			fixed: {
				mode: "icon",
			},
			initial: {
				disabled: false,
				label: "Add item",
				loading: false,
				showIcons: false,
			},
			variant: "Icon",
		},
		{
			fixed: {
				asChild: true,
				disabled: false,
				loading: false,
				mode: "filled",
			},
			initial: {
				label: "As Child Button",
				showIcons: true,
			},
			variant: "As Child",
		},
	],
	// biome-ignore lint/style/useNamingConvention: Fumadocs Story defines this API property.
	Component: ButtonStory,
	displayName: "Button",
});
