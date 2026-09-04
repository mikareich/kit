"use client";

import { ExternalLinkIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import type { ComponentProps } from "react";
import { defineStory } from "@/app/_lib/story.ts";
import { Button } from "./button";
import {
	createBooleanNode,
	createEnumNode,
	createObjectNode,
	createObjectProperty,
	createStringNode,
} from "./story-helper/nodes";
import { Wrapper, wrapInLayout } from "./story-helper/wrapper";

const INITIAL_PROPS = {
	children: "Button",
	prefixIcon: <PlusIcon />,
	suffixIcon: <MinusIcon />,
} as const;

const ICON_ENUM_NODE = createEnumNode(
	{ label: "PlusIcon", value: <PlusIcon /> },
	{ label: "MinusIcon", value: <MinusIcon /> },
	{ label: "ExternalLinkIcon", value: <ExternalLinkIcon /> },
);

const MODE_LABLES = [
	{ label: "Filled", value: "filled" },
	{ label: "Outlined", value: "outlined" },
	{ label: "Ghost", value: "ghost" },
	{ label: "Icon", value: "icon" },
] as const;

const MODE_ENUM_NODE = createEnumNode(...MODE_LABLES);

const MODE_CONTROL = createObjectProperty("mode", MODE_ENUM_NODE);
const CHILDREN_CONTROL = createObjectProperty("children", createStringNode());
const LOADING_CONTROL = createObjectProperty("loading", createBooleanNode());
const DISABLED_CONTROL = createObjectProperty("disabled", createBooleanNode());
const PREFIX_CONTROL = createObjectProperty("prefixIcon", ICON_ENUM_NODE);
const SUFFIX_CONTROL = createObjectProperty("suffixIcon", ICON_ENUM_NODE);

const BASE_CONTROL_PROPERTIES = [
	CHILDREN_CONTROL,
	DISABLED_CONTROL,
	PREFIX_CONTROL,
	SUFFIX_CONTROL,
];

const NO_CONTROLS = { node: createObjectNode() } as const;

function ButtonModes({
	children,
	...props
}: Omit<ComponentProps<typeof Button>, "mode">) {
	return (
		<Wrapper className="grid grid-cols-2 place-items-center">
			{MODE_LABLES.map(({ value }) => (
				<Button {...props} key={value} mode={value}>
					{value === "icon" ? <ExternalLinkIcon /> : children}
				</Button>
			))}
		</Wrapper>
	);
}

export const BUTTON_ARBITRARY_STORY = defineStory({
	args: {
		controls: {
			node: createObjectNode(
				...BASE_CONTROL_PROPERTIES,
				MODE_CONTROL,
				LOADING_CONTROL,
			),
		},
		initial: INITIAL_PROPS,
	},
	Component: wrapInLayout(Button),
	displayName: "Button",
});

export const BUTTON_MODE_STORY = defineStory({
	args: {
		controls: {
			node: createObjectNode(...BASE_CONTROL_PROPERTIES, LOADING_CONTROL),
		},
		initial: INITIAL_PROPS,
	},
	Component: ButtonModes,
	displayName: "Button Modes",
});

export const BUTTON_LOADING_STORY = defineStory({
	args: MODE_LABLES.map((mode) => ({
		controls: NO_CONTROLS,
		initial: {
			...INITIAL_PROPS,
			children:
				mode.value === "icon" ? <ExternalLinkIcon /> : INITIAL_PROPS.children,
			loading: true,
			mode: mode.value,
		},
		variant: mode.label,
	})),
	Component: wrapInLayout(Button),
	displayName: "Loading State",
});

export const BUTTON_THEMES_STORY = defineStory({
	args: [
		{
			controls: {
				node: createObjectNode(MODE_CONTROL, LOADING_CONTROL),
			},
			initial: { ...INITIAL_PROPS, className: "warning" },
			variant: "Warning Theme",
		},
		{
			controls: {
				node: createObjectNode(MODE_CONTROL, LOADING_CONTROL),
			},
			initial: { ...INITIAL_PROPS, className: "error" },
			variant: "Error Theme",
		},
	],
	Component: wrapInLayout(Button),
	displayName: "Button Themes",
});
