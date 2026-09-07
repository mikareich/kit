# UI Primitive Implementation Guide

Use this guide when implementing or extending a primitive in this repository.
It describes the complete feature surface expected from a component request,
not just the React source file.

## Start with the closest existing primitive

Before writing code, identify the component that is closest in appearance,
behavior, or API. Read all of its related files:

- `ui/<primitive>.tsx` for implementation and code style
- `ui/<primitive>.story.tsx` for interactive examples and controls
- `docs/components/<primitive>.mdx` for documentation structure
- `ui/registry.json` for distribution metadata
- `docs/components/meta.json` for documentation navigation
- `ui/theme.css` for available tokens and utilities

Treat the reference as a source of exact design decisions, but remove variants,
props, dependencies, and logic that the new primitive does not need. Prefer a
small native-element API over copying complexity from the reference.

## Implement the primitive

### API

- Extend the appropriate native element props with
  `React.ComponentProps<"element">`.
- Add only explicitly useful custom props.
- Use `React.ReactNode` for composable slots such as icons or labels.
- Forward remaining native props to the actual native element.
- Preserve native behavior, including `disabled`, keyboard interaction, input
  types, accessibility attributes, and event handlers.
- Add a short JSDoc summary and link to the component documentation.

### Structure and styling

- Reproduce shared dimensions and states from the reference literally when the
  request calls for visual parity. Compare layout, gap, padding, typography,
  border, color, hover, focus, and disabled styles.
- Use existing theme tokens such as `bg-theme-bg`, `text-theme-text`,
  `border-theme-border`, and `bg-theme-bg-accent`; do not introduce raw colors
  when an equivalent token exists.
- Put the root/container styles in a module-level `<primitive>Styles` constant.
  Use CVA when styles depend on variants or states, matching the established
  component pattern.
- Use `cn()` only to combine generated root styles with consumer `className`.
- Apply the consumer `className` to the public visual container when the
  component wraps a native element. This allows theme classes such as
  `.warning` and `.error` to scope all descendants.
- Keep inner native controls visually neutral where the wrapper owns the
  surface. For example, use a transparent native-control background when the
  outer container supplies the background, border, padding, and focus ring.
- Keep icon wrappers non-shrinking and visually subordinate unless the design
  says otherwise. Render optional slots only when they are neither `null` nor
  `undefined`.
- Ensure flex children can shrink with `min-w-0` where applicable.

### State ownership

Decide which element owns each state before styling:

- The native element owns semantics and attributes.
- The visual container owns border, surface, dimensions, and theme scope.
- Use `focus-within` when focus occurs on a nested native control.
- Reflect native disabled state on the container for opacity and cursor, and on
  the native control for actual behavior.
- Avoid hover or focus affordances when disabled.

## Add an interactive story

Create `ui/<primitive>.story.tsx` and follow the existing Fumadocs Story helper
patterns.

- Add `"use client"`.
- Use `defineStory` and `wrapInLayout`.
- Provide a focused arbitrary/default story with controls for meaningful public
  props only.
- Extract reused initial props and controls into constants.
- Use a small, representative set of icons or values rather than exhaustive
  options.
- Add separate stories only for behavior worth demonstrating, such as variants,
  loading, disabled states, or theming.

For theme-aware primitives, add a theme story with at least `.warning` and
`.error` examples. Apply the theme class through the component's public
`className` API so the story verifies real consumer behavior. The regular story
already demonstrates the default theme.

## Add concise documentation

Create `docs/components/<primitive>.mdx` with:

1. Frontmatter containing a title and one-sentence description.
2. The primary interactive story.
3. A short explanation of native and custom props.
4. An installation command:

   ```bash
   bunx shadcn add mikareich/kit/<primitive>
   ```

5. The existing note about replacing `add` with `init` for first-time setup.
6. Only the additional sections needed for the component.

Keep documentation proportional to the API. A simple primitive should not copy
the reference component's full documentation. If the primitive responds to
themes, include a brief `## Theming` section and render its theme story there.

Add the page slug to `docs/components/meta.json` so it appears in navigation.

## Register the distributable component

Add an item to `ui/registry.json` with:

- author, name, title, description, docs URL, and `registry:ui` type
- the source file mapped to `@ui/<primitive>.tsx`
- `mikareich/kit/base` as a registry dependency when shared Kit setup is used
- every runtime package imported by the distributed source file

Do not add story or documentation dependencies to the registry item. Validate
that `loadRegistryItem("<primitive>")` can resolve the item and expected target.

## Validate the complete change

Run checks after implementation and again after follow-up refinements:

```bash
bunx biome check ui/<primitive>.tsx ui/<primitive>.story.tsx \
  docs/components/meta.json ui/registry.json
bunx tsc --noEmit
bun run build
git diff --check
```

The production build verifies MDX imports, stories, and generated documentation
routes in addition to the component. Next.js may rewrite `next-env.d.ts` during
a build; do not include that generated change unless it was intentionally part
of the request.

Before finishing:

- Review `git diff` for accidental changes.
- Confirm the docs route was generated.
- Confirm the registry item resolves.
- Confirm the worktree contains only intended user work.
- Do not commit or push unless the user requests it.

## Handling iterative feedback

Treat follow-up requests as refinements of the same component contract:

- A surface-color correction should clarify whether the visual container or
  inner native element owns the background.
- A request to extract styles should move all container styling, including
  state branches, into the shared style constant rather than moving only the
  static classes.
- A theming request requires both a visible story and concise documentation,
  not merely token-compatible implementation code.
- If extracting styles introduces a package import, update the registry runtime
  dependencies at the same time.

After every refinement, rerun at least the formatter/linter and TypeScript. Run
the full production build whenever stories, MDX, routing, or registry metadata
change.
