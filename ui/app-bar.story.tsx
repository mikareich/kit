"use client";

import { defineStory } from "@/app/_lib/story.ts";
import { AppBar } from "./app-bar";
import {
	createObjectNode,
	createObjectProperty,
	createStringNode,
} from "./story-helper/nodes";
import { wrapInLayout } from "./story-helper/wrapper";

const INITIAL_PROPS = {
	firstItem: "Components",
	logo: "Kit",
	secondItem: "Theming",
} as const;

const CONTROLS = {
	node: createObjectNode(
		createObjectProperty("logo", createStringNode()),
		createObjectProperty("firstItem", createStringNode()),
		createObjectProperty("secondItem", createStringNode()),
	),
};

type AppBarPreviewProps = {
	className?: string;
	firstItem: string;
	logo: string;
	secondItem: string;
};

function AppBarPreview({
	className,
	firstItem,
	logo,
	secondItem,
}: AppBarPreviewProps) {
	return (
		<AppBar asChild className={className}>
			<nav aria-label="Primary">
				<AppBar.Logo href="/">{logo}</AppBar.Logo>
				<AppBar.Item href="#components">{firstItem}</AppBar.Item>
				<AppBar.Item href="#theming">{secondItem}</AppBar.Item>
			</nav>
		</AppBar>
	);
}

export const APP_BAR_ARBITRARY_STORY = defineStory({
	args: {
		controls: CONTROLS,
		initial: INITIAL_PROPS,
	},
	Component: wrapInLayout(AppBarPreview),
	displayName: "App Bar",
});

export const APP_BAR_THEMES_STORY = defineStory({
	args: [
		{
			controls: CONTROLS,
			initial: { ...INITIAL_PROPS, className: "warning" },
			variant: "Warning Theme",
		},
		{
			controls: CONTROLS,
			initial: { ...INITIAL_PROPS, className: "error" },
			variant: "Error Theme",
		},
	],
	Component: wrapInLayout(AppBarPreview),
	displayName: "App Bar Themes",
});
