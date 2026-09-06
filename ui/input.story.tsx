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

export const INPUT_ARBITRARY_STORY = defineStory({
	args: {
		controls: {
			node: createObjectNode(
				createObjectProperty("placeholder", createStringNode()),
				createObjectProperty("disabled", createBooleanNode()),
				createObjectProperty("prefixIcon", ICON_ENUM_NODE),
				createObjectProperty("suffixIcon", ICON_ENUM_NODE),
			),
		},
		initial: {
			placeholder: "Search",
			prefixIcon: <MagnifyingGlassIcon />,
			suffixIcon: <MixerHorizontalIcon />,
		},
	},
	Component: wrapInLayout(Input),
	displayName: "Input",
});
