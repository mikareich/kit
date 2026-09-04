import "./global.css";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import { baseOptions } from "./_lib/layout.tsx";
import { source } from "./_lib/source.ts";

export const metadata: Metadata = {
	description: "Documentation and registry for Kit reusable primitives.",
	metadataBase: new URL("https://kit.reich.re"),
	title: {
		default: "Kit",
		template: "%s | Kit",
	},
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}): ReactElement {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className="flex min-h-screen flex-col">
				<RootProvider theme={{ enabled: true }}>
					<DocsLayout tree={source.getPageTree()} {...baseOptions()}>
						{children}
					</DocsLayout>
				</RootProvider>
			</body>
		</html>
	);
}
