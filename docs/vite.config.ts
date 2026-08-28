import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// biome-ignore lint/style/noDefaultExport: expected by Vite
export default defineConfig({
	plugins: [tailwindcss()],
});
