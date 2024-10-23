import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("kaboom")) {
						// Utwórz osobny chunk dla kaboom.mjs
						return "kaboom";
					}
				},
			},
		},
	},
});
