import { Button } from "@kit/ui/button.tsx";
import preview from "../.storybook/preview.tsx";

const meta = preview.meta({
	component: Button,
});

export const Primary = meta.story({
	args: {
		primary: true,
		label: "Button",
	},
});
