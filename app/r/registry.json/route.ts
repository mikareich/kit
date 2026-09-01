import process from "node:process";
import { loadRegistry } from "shadcn/registry";

const REPOSITORY_ROOT = process.cwd();

export const runtime = "nodejs";

export async function GET(): Promise<Response> {
	try {
		const registry = await loadRegistry({ cwd: REPOSITORY_ROOT });
		return Response.json(registry);
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: unexpected server failures must remain observable.
		console.error(error);
		return Response.json(
			{ error: "Failed to load registry." },
			{ status: 500 },
		);
	}
}
