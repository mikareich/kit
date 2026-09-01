import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";

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
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
