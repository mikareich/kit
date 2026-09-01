"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import type { ReactElement, ReactNode } from "react";
import { Button } from "@/ui/button.tsx";

export interface ButtonStoryProps {
	asChild?: boolean;
	disabled?: boolean;
	label?: string;
	loading?: boolean;
	mode?: "filled" | "outlined" | "ghost" | "icon";
	showIcons?: boolean;
}

export function ButtonStory({
	asChild = false,
	disabled = false,
	label = "Button",
	loading = false,
	mode = "filled",
	showIcons = true,
}: ButtonStoryProps): ReactElement {
	let children: ReactNode = label;
	if (mode === "icon") {
		children = <PlusIcon aria-label={label} />;
	} else if (asChild) {
		children = <a href="/docs/components/button">{label}</a>;
	}

	let prefixIcon: ReactNode;
	let suffixIcon: ReactNode;
	if (showIcons) {
		prefixIcon = <PlusIcon />;
		suffixIcon = <MinusIcon />;
	}

	return (
		<div className="default flex min-h-32 items-center justify-center rounded-lg bg-theme-bg p-6">
			<Button
				asChild={asChild}
				disabled={disabled}
				loading={loading}
				mode={mode}
				prefixIcon={prefixIcon}
				suffixIcon={suffixIcon}
			>
				{children}
			</Button>
		</div>
	);
}
