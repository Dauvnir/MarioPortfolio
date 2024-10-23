import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		minify: true, // Disable minification to check if that's causing the issue

		sourcemap: true,
	},
});
