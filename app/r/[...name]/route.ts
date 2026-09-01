import process from "node:process";
import { loadRegistryItem, RegistryItemNotFoundError } from "shadcn/registry";

const REPOSITORY_ROOT = process.cwd();
const ITEM_PATH_PATTERN = /^\/r\/(?<name>[^/]+)\.json$/u;

export const runtime = "nodejs";

export async function GET(request: Request): Promise<Response> {
	const { pathname } = new URL(request.url);
	const name = pathname.match(ITEM_PATH_PATTERN)?.groups?.name;
	if (!name) {
		return Response.json(
			{ error: "Registry item was not found." },
			{ status: 404 },
		);
	}

	try {
		const item = await loadRegistryItem(name, { cwd: REPOSITORY_ROOT });
		return Response.json(item);
	} catch (error) {
		if (error instanceof RegistryItemNotFoundError) {
			return Response.json(
				{ error: `Registry item "${name}" was not found.` },
				{ status: 404 },
			);
		}

		// biome-ignore lint/suspicious/noConsole: unexpected server failures must remain observable.
		console.error(error);
		return Response.json(
			{ error: "Failed to load registry item." },
			{ status: 500 },
		);
	}
}
