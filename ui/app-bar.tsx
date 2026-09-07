import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/cn.ts";

const appBarStyles = `
	flex min-w-0 items-center gap-4
	w-full px-4 py-3
	font-heading
	bg-theme-bg text-theme-text
`;

const appBarItemStyles = `
	inline-flex shrink-0 items-center gap-2
	px-2 py-2
	cursor-pointer select-none
	text-body text-link text-theme-text-subtle no-underline hover:underline
`;

const appBarLogoStyles =
	"mr-auto py-0 text-xl font-bold text-theme-text hover:no-underline";

type AppBarProps = React.ComponentProps<"div"> & {
	asChild: true;
};

/**
 * Layout primitive for composing navigation bars, headers, and footers.
 * @link https://kit.reich.re/docs/components/app-bar
 */
export function AppBar({
	asChild: _asChild,
	className,
	...props
}: AppBarProps): React.ReactElement {
	return <Slot className={cn(appBarStyles, className)} {...props} />;
}

type AppBarItemProps = React.ComponentProps<typeof Link> & {
	asChild?: boolean;
};

/** A link item within an AppBar. */
function AppBarItem({
	asChild,
	className,
	...props
}: AppBarItemProps): React.ReactElement {
	const Comp = asChild ? Slot : Link;

	return <Comp className={cn(appBarItemStyles, className)} {...props} />;
}

/** A visually emphasized AppBar item intended for a brand mark. */
function AppBarLogo({
	className,
	...props
}: AppBarItemProps): React.ReactElement {
	return <AppBarItem className={cn(appBarLogoStyles, className)} {...props} />;
}

AppBar.Item = AppBarItem;
AppBar.Logo = AppBarLogo;
