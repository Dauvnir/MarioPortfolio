import { useEffect } from "react";
import { kaboomContext } from "../kaboomGame/KaboomContext";
import { mainGame } from "../kaboomGame/MainGame";
const KaboomGame = () => {
	useEffect(() => {
		const canvasElement = document.querySelector("#mycanvas");
		kaboomContext(canvasElement);
		mainGame();
	}, []);

	return <canvas id="mycanvas"></canvas>;
};

export default KaboomGame;
