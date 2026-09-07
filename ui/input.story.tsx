"use client";

import {
	MagnifyingGlassIcon,
	MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { defineStory } from "@/app/_lib/story.ts";
import { Input } from "./input";
import {
	createBooleanNode,
	createEnumNode,
	createObjectNode,
	createObjectProperty,
	createStringNode,
} from "./story-helper/nodes";
import { wrapInLayout } from "./story-helper/wrapper";

const ICON_ENUM_NODE = createEnumNode(
	{ label: "MagnifyingGlassIcon", value: <MagnifyingGlassIcon /> },
	{ label: "MixerHorizontalIcon", value: <MixerHorizontalIcon /> },
);

const INITIAL_PROPS = {
	placeholder: "Search",
	prefixIcon: <MagnifyingGlassIcon />,
	suffixIcon: <MixerHorizontalIcon />,
} as const;

const DISABLED_CONTROL = createObjectProperty("disabled", createBooleanNode());

export const INPUT_ARBITRARY_STORY = defineStory({
	args: {
		controls: {
			node: createObjectNode(
				createObjectProperty("placeholder", createStringNode()),
				DISABLED_CONTROL,
				createObjectProperty("prefixIcon", ICON_ENUM_NODE),
				createObjectProperty("suffixIcon", ICON_ENUM_NODE),
			),
		},
		initial: INITIAL_PROPS,
	},
	Component: wrapInLayout(Input),
	displayName: "Input",
});

export const INPUT_THEMES_STORY = defineStory({
	args: [
		{
			controls: { node: createObjectNode(DISABLED_CONTROL) },
			initial: { ...INITIAL_PROPS, className: "warning" },
			variant: "Warning Theme",
		},
		{
			controls: { node: createObjectNode(DISABLED_CONTROL) },
			initial: { ...INITIAL_PROPS, className: "error" },
			variant: "Error Theme",
		},
	],
	Component: wrapInLayout(Input),
	displayName: "Input Themes",
});
