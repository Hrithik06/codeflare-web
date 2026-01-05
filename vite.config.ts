import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		visualizer({
			filename: "bundle-stats.html", // Puts the graph file at project root
			open: true, // Auto-opens after build
			template: "treemap", // Use treemap view (better visual)
			gzipSize: true,
			brotliSize: true,
		}),
	],
	//NOTE:Here vite is proxying in prod nginx does the proxying
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:7777",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
			"/api/socket.io": {
				target: "http://localhost:7777",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
