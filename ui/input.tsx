import { cva } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/cn.ts";

const inputStyles = cva(
	`
	flex gap-2 items-center
	w-fit max-w-full px-4 py-3
	transition-all
	text-action
	focus-within:outline-none
	bg-transparent text-theme-text
	border border-theme-border
	`,
	{
		variants: {
			disabled: {
				false: "hover:bg-theme-bg-accent focus-within:outlined",
				true: "opacity-50 cursor-not-allowed",
			},
		},
	},
);

type InputProps = React.ComponentProps<"input"> & {
	prefixIcon?: React.ReactNode;
	suffixIcon?: React.ReactNode;
};

/**
 * Input primitive extending the native input element.
 * @link https://kit.reich.re/docs/components/input
 */
export function Input({
	className,
	prefixIcon,
	suffixIcon,
	disabled,
	...props
}: InputProps): React.ReactElement {
	return (
		<div
			className={cn(inputStyles({ disabled: Boolean(disabled) }), className)}
		>
			{prefixIcon !== null && prefixIcon !== undefined && (
				<span className="shrink-0 opacity-50">{prefixIcon}</span>
			)}

			<input
				className="min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed"
				disabled={disabled}
				{...props}
			/>

			{suffixIcon !== null && suffixIcon !== undefined && (
				<span className="shrink-0 opacity-50">{suffixIcon}</span>
			)}
		</div>
	);
}
