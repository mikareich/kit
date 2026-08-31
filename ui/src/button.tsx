import { cn } from "@/lib/cn";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type React from "react";
import { cloneElement, isValidElement } from "react";

const buttonStyles = cva(
	`
	flex gap-2 items-center
	w-fit max-w-full px-4 py-3
	cursor-pointer
	transition-all
	text-action
	`,
	{
		compoundVariants: [
			{
				className: `
									hover:bg-theme-primary/80 focus:bg-theme-primary/80
									`,
				disabled: false,
				mode: "filled",
			},
			{
				className: `
									 hover:bg-theme-bg-accent
									 `,
				disabled: false,
				mode: ["outlined", "ghost", "icon"],
			},
		],
		variants: {
			disabled: {
				true: `
		          opacity-50 cursor-not-allowed
							`,
			},
			mode: {
				filled: `
								bg-theme-primary text-theme-foreground
								border border-theme-primary
								`,
				ghost: `
							 bg-transparent text-theme-text
							 border border-transparent
							 `,
				icon: `
              bg-transparent text-theme-text
							border border-theme-border
							p-3
              `,
				outlined: `
								  bg-transparent text-theme-text
									border border-theme-border
									`,
			},
		},
	},
);

type ButtonProps = React.ComponentProps<"button"> & {
	prefixIcon?: React.ReactNode;
	suffixIcon?: React.ReactNode;
	asChild?: boolean;
	loading?: boolean;
	mode: "filled" | "outlined" | "ghost" | "icon";
};

/**
 * Button primitive extending the native button element.
 * @link https://kit.reich.re/?path=/docs/ui-button--docs
 */
export function Button({
	className,
	prefixIcon,
	suffixIcon,
	children,
	asChild,
	disabled,
	loading,
	mode = "filled",
	...props
}: ButtonProps): React.ReactElement {
	let Comp: typeof Slot | "button" = "button";
	if (asChild) {
		Comp = Slot;
	}

	const effectiveDisabled = Boolean(disabled || loading);
	let effectivePrefixIcon = prefixIcon;
	let effectiveSuffixIcon = suffixIcon;
	let effectiveChildren = children;
	const loadingIcon = <ReloadIcon className="animate-spin" />;

	if (loading) {
		effectivePrefixIcon = loadingIcon;
	}

	if (mode === "icon") {
		effectivePrefixIcon = null;
		effectiveSuffixIcon = null;

		if (loading) {
			effectiveChildren = loadingIcon;

			if (asChild && isValidElement(children)) {
				effectiveChildren = cloneElement(children, undefined, loadingIcon);
			}
		}
	}

	return (
		<Comp
			className={cn(
				buttonStyles({ disabled: effectiveDisabled, mode }),
				className,
			)}
			{...props}
		>
			{effectivePrefixIcon !== null && effectivePrefixIcon !== undefined && (
				<span className="shrink-0 opacity-50">{effectivePrefixIcon}</span>
			)}

			<Slottable child={effectiveChildren}>
				{(child: React.ReactNode): React.ReactNode => (
					<span className="min-w-0 flex-1 truncate">{child}</span>
				)}
			</Slottable>

			{effectiveSuffixIcon !== null && effectiveSuffixIcon !== undefined && (
				<span className="shrink-0 opacity-50">{effectiveSuffixIcon}</span>
			)}
		</Comp>
	);
}
