import WelcomePage from "./pages/WelcomePage";
import KaboomGame from "./pages/KaboomGame";
import KaboomUI from "./pages/KaboomUI";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {
	const navigate = useNavigate();
	useEffect(() => {
		const handlerResize = () => {
			navigate("/");
		};
		window.addEventListener("resize", handlerResize);

		return () => {
			window.removeEventListener("resize", handlerResize);
		};
	}, [navigate]);

	return (
		<Routes>
			<Route
				path="/"
				element={<WelcomePage />}
			/>
			<Route
				path="game"
				element={
					<>
						<KaboomUI />
						<KaboomGame />
					</>
				}
			/>
			<Route
				path="*"
				element={
					<Navigate
						to="/"
						replace
					/>
				}
			/>
		</Routes>
	);
}

export default App;
