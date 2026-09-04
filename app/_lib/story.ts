"use client";

import {
	defineStoryFactory,
	type StoryOptions,
} from "@fumadocs/story/next/client";
import type { FC } from "react";

const { defineStory: defineBaseStory } = defineStoryFactory();

// biome-ignore lint/suspicious/noExplicitAny: Fumadocs accepts components with arbitrary prop types.
export function defineStory<C extends FC<any>>(options: StoryOptions<C>): FC {
	return defineBaseStory(options).WithControl;
}
