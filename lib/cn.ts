import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Defines how to resolute conflicting custom tw classes.
// You might need to update this configuration if you edit the tw theme.
// https://github.com/dcastil/tailwind-merge/blob/main/docs/configuration.md
const twMerge = extendTailwindMerge<string, string>({
	extend: {
		classGroups: {
			outlined: ["outlined"],
			"semantic-theme": ["default", "error", "warning"],
			"text-styles": [
				{
					text: [
						"heading-1",
						"heading-2",
						"heading-3",
						"heading-4",
						"body",
						"action",
						"small",
					],
				},
			],
		},
		conflictingClassGroups: {
			outlined: ["ring-w", "ring-color"],
			"text-styles": [
				"font-family",
				"font-size",
				"font-weight",
				"leading",
				"text-transform",
				"text-color",
				"select",
			],
		},
	},
});

/** Merges tailwind classes and ensures only the last conflicting class is kept. */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
