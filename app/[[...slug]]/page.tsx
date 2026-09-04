import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { source } from "@/app/_lib/source.ts";
import { getMDXComponents } from "@/mdx-components.tsx";

export function generateStaticParams(): ReturnType<
	typeof source.generateParams
> {
	return source.generateParams();
}

export async function generateMetadata(
	props: PageProps<"/[[...slug]]">,
): Promise<Metadata> {
	const { slug } = await props.params;
	const page = source.getPage(slug);
	if (!page) {
		notFound();
	}

	return {
		description: page.data.description,
		title: page.data.title,
	};
}

export default async function DocsContentPage(
	props: PageProps<"/[[...slug]]">,
): Promise<ReactElement> {
	const { slug } = await props.params;
	const page = source.getPage(slug);
	if (!page) {
		notFound();
	}

	const Mdx = page.data.body;

	return (
		<DocsPage full={page.data.full} toc={page.data.toc}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>

			<DocsBody>
				<Mdx components={getMDXComponents()} />
			</DocsBody>
		</DocsPage>
	);
}
