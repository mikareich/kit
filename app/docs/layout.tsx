import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactElement, ReactNode } from "react";
import { baseOptions } from "@/app/_lib/layout.tsx";
import { source } from "@/app/_lib/source.ts";

export default function DocsRootLayout({
	children,
}: {
	children: ReactNode;
}): ReactElement {
	return (
		<DocsLayout tree={source.getPageTree()} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
