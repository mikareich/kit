"use client";

import { cn } from "@/lib/cn";

export type StoryLayoutProps = React.ComponentProps<"div">;

export function Wrapper({ className, ...props }: StoryLayoutProps) {
	return (
		<div
			className={cn(
				"flex min-h-48 bg-theme-bg items-center justify-center p-8",
				className,
			)}
			{...props}
		/>
	);
}

export function wrapInLayout<Props extends object>(Component: React.FC<Props>) {
	return (props: Props) => (
		<Wrapper>
			<Component {...props} />
		</Wrapper>
	);
}
