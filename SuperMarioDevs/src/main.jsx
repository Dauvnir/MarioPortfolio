import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/*"
					element={<App />}
				/>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
