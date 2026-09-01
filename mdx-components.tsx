import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

declare global {
	type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

// biome-ignore lint/style/useNamingConvention: required by the Next.js MDX convention.
export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		...components,
	};
}

// biome-ignore lint/style/useNamingConvention: required by the Next.js MDX convention.
export const useMDXComponents: typeof getMDXComponents = getMDXComponents;
