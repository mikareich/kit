import { Button } from "@/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import preview from "../../.storybook/preview.tsx";

const ButtonMeta = preview.meta({
	argTypes: {
		asChild: {
			description:
				"Whether to hoist the child element as container. Uses `@radix-ui/slot`.",
			table: {
				defaultValue: {
					summary: "false",
				},
			},
		},
		disabled: {
			table: {
				defaultValue: {
					summary: "null",
				},
			},
			type: "boolean",
		},
		loading: {
			description:
				"Displays a loading spinner instead of the prefix icon or child for icon buttons.",
			table: {
				defaultValue: {
					summary: "null",
				},
			},
			type: "boolean",
		},
		mode: {
			control: "select",
			description: "The display mode of the button.",
			options: ["filled", "outlined", "ghost", "icon"],
			table: {
				defaultValue: {
					summary: "filled",
				},
			},
		},
		prefixIcon: {
			description: "The prefix icon to display. Hidden on icon buttons.",
			table: {
				defaultValue: {
					summary: "null",
				},
			},
		},
		suffixIcon: {
			description: "The prefix icon to display. Hidden on icon buttons.",
			table: {
				defaultValue: {
					summary: "null",
				},
			},
		},
	},
	component: Button,
	title: "UI / Button",
});

export const DefaultButton = ButtonMeta.story({
	args: {
		children: "Button",
		mode: "filled",
		prefixIcon: <PlusIcon />,
		suffixIcon: <MinusIcon />,
	},
	argTypes: ButtonMeta.input.argTypes,
});

export const OutlinedButton = ButtonMeta.story({
	args: {
		...DefaultButton.input.args,
		children: "Button",
		mode: "outlined",
	},
	argTypes: ButtonMeta.input.argTypes,
	name: "Outlined Button",
});

export const GhostButton = ButtonMeta.story({
	args: {
		...DefaultButton.input.args,
		children: "Button",
		mode: "ghost",
	},
	argTypes: ButtonMeta.input.argTypes,
	name: "Ghost Button",
});

export const AsChildButton = ButtonMeta.story({
	args: {
		...DefaultButton.input.args,
		asChild: true,
		children: <a href="/">{DefaultButton.input.args.children}</a>,
	},
	argTypes: ButtonMeta.input.argTypes,
	name: "As Child Button",
});

export const IconButton = ButtonMeta.story({
	args: {
		children: <PlusIcon />,
		mode: "icon",
	},
	argTypes: ButtonMeta.input.argTypes,
	name: "Icon Button",
});
