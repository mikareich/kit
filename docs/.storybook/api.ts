import { join } from "node:path";
import type { viteFinal } from "@storybook/react-vite/preset";
import { loadRegistry, loadRegistryItem } from "shadcn/registry";
import type { ViteDevServer } from "vite";

const REGISTRY_BASE_URL = join(import.meta.dirname, "..", "..");
const SUCCESS_CODE = 200;
const INTERNAL_ERROR_CODE = 500;
const ITEM_NAME_REGEX = /^\/r\/(?<name>[^/]+)\.json$/u;

function api(server: ViteDevServer): void {
	server.middlewares.use("/r/", async (req, res) => {
		let body: Record<string, unknown>;
		try {
			const { host } = req.headers;

			const path = req.originalUrl;
			if (!(host && path)) {
				throw new Error("No request url present.");
			}

			const url = new URL(path, `http://${host}`);

			switch (url.pathname) {
				case "/r/registry.json": {
					// load root registry
					body = await loadRegistry({ cwd: REGISTRY_BASE_URL });
					break;
				}

				default: {
					// determine item name from pathname
					const match = url.pathname.match(ITEM_NAME_REGEX);
					const name = match?.groups?.name;
					if (!name) {
						throw new Error("Could not capture item name from url.");
					}

					body = await loadRegistryItem(name, {
						cwd: REGISTRY_BASE_URL,
					});
				}
			}

			res.statusCode = SUCCESS_CODE;
		} catch (error) {
			res.statusCode = INTERNAL_ERROR_CODE;
			body = { error: "An error occured." };

			if (error instanceof Error) {
				body = { error: error.message };
			}
		}

		res.setHeader("Content-Type", "application/json; charset=utf-8");
		res.end(JSON.stringify(body));
	});
}

type ViteFinal = typeof viteFinal;

export function initApi(
	config: Parameters<ViteFinal>[0],
): ReturnType<ViteFinal> {
	config.server ??= {};

	const allowedHosts = new Set<string>(["dev-box"]);
	if (Array.isArray(config?.server?.allowedHosts)) {
		for (const host of config.server.allowedHosts) {
			allowedHosts.add(host);
		}
	}
	config.server.allowedHosts = Array.from(allowedHosts);

	config.resolve ??= {};
	config.resolve.tsconfigPaths = true;

	config.plugins ??= [];
	config.plugins.push({ configureServer: api, name: "api" });

	return config;
}
