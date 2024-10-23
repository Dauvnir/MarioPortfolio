import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		sourcemap: true, // Włącz mapy źródeł
		rollupOptions: {
			external: ["kaboom.mjs"], // Wyklucz dokładnie kaboom.mjs jako zewnętrzny zasób
			output: {
				manualChunks(id) {
					if (id.includes("kaboom.mjs")) {
						return "kaboom"; // Stwórz osobny chunk dla kaboom.mjs
					}
				},
			},
		},
	},
});
