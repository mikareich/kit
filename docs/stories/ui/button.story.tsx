import { Button } from "@kit/ui/button.tsx";
// biome-ignore lint/performance/noNamespaceImport: avoids a false missing-export diagnostic from the package's legacy barrel
import * as RadixIcons from "@radix-ui/react-icons";
import preview from "../../.storybook/preview.tsx";

const ButtonMeta = preview.meta({
	title: "UI / Button",
	component: Button,
	argTypes: {
		asChild: {
			description:
				"Whether to hoist the child element as container. Uses `@radix-ui/slot`.",
		},
		mode: {
			description: "The display mode of the button.",
			options: ["filled", "outlined", "ghost", "icon"],
			control: "select",
		},
		className: {
			control: "text",
		},
	},
});

export const DefaultButton = ButtonMeta.story({
	args: {
		children: "Button",
		asChild: false,
		prefixIcon: <RadixIcons.PlusIcon />,
		suffixIcon: <RadixIcons.MinusIcon />,
		loading: false,
		disabled: false,
		mode: "filled",
	},
	argTypes: ButtonMeta.input.argTypes,
});

export const OutlinedButton = ButtonMeta.story({
	name: "Outlined Button",
	args: {
		...DefaultButton.input.args,
		children: "Button",
		mode: "outlined",
	},
	argTypes: ButtonMeta.input.argTypes,
});

export const GhostButton = ButtonMeta.story({
	name: "Ghost Button",
	args: {
		...DefaultButton.input.args,
		children: "Button",
		mode: "ghost",
	},
	argTypes: ButtonMeta.input.argTypes,
});

export const AsChildButton = ButtonMeta.story({
	name: "As Child Button",
	args: {
		...DefaultButton.input.args,
		children: <a href="/">{DefaultButton.input.args.children}</a>,
		asChild: true,
	},
	argTypes: ButtonMeta.input.argTypes,
});

export const IconButton = ButtonMeta.story({
	name: "Icon Button",
	args: {
		children: <RadixIcons.PlusIcon />,
		mode: "icon",
	},
	argTypes: ButtonMeta.input.argTypes,
});
