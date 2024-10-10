import { generatePlayer, setPlayerMovement } from "../entities/marioPlayer";
import {
	cameraMove,
	colorizeBackground,
	drawBoundaries,
	drawTiles,
	fetchMapData,
} from "../utils";

export async function tweenLevel(k) {
	colorizeBackground(k, 0, 0, 0);
	const mapData = await fetchMapData("./src/assets/map/tweenLevel.json");
	const map = k.add([k.pos(0, 0)]);
	const entities = {
		player: null,
	};
	const layers = mapData.layers;
	const mapHeight = mapData.height * mapData.tileheight;

	for (const layer of layers) {
		if (layer.name === "Boundaries") {
			drawBoundaries(k, map, layer);
		}
		if (layer.name === "SpawnPoints") {
			for (const object of layer.objects) {
				if (object.name === "mario") {
					entities.player = k.add(
						generatePlayer(k, k.vec2(object.x, object.y))
					);
				}
			}
		}
		if (layer.name === "Nextworld") {
			drawBoundaries(k, map, layer, "nextWorld");
		}
		if (layer.name === "Pipes") {
			drawBoundaries(k, map, layer);
		}
		if (layer.name === "Assets") {
			drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
		}
	}

	cameraMove(k, mapData, entities.player);

	k.setGravity(mapHeight - 16 / 10);

	setPlayerMovement(k, entities.player);
	entities.player.onCollide("coin", (coin) => {
		// coin.hidden = true;
		// coin.area.width = 0;
		// coin.area.height = 0;
		// coin.area.offset = 0;
		// coin.area.scale = 0;
		// coin.area.shape.width = 0;
		// coin.area.shape.height = 0;
		k.destroy(coin);
	});

	entities.player.onCollide("nextWorld", () => {
		k.go("world2");
	});
}
