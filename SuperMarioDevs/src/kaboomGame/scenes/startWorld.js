import { generatePlayer, setPlayerMovement } from "../entities/marioPlayer";
import {
	cameraMove,
	collidingPlayerWithBlock,
	colorizeBackground,
	drawBoundaries,
	drawTiles,
	enterThePipe,
	fetchMapData,
} from "../utils";

export async function startWorld(k) {
	colorizeBackground(k, 99, 160, 253);
	const mapData = await fetchMapData("./src/assets/map/startWorld.json");
	const map = k.add([0, 0]);
	const mapHeight = mapData.height * mapData.tileheight;
	const entities = {
		player: null,
	};

	const layers = mapData.layers;

	for (const layer of layers) {
		if (layer.name === "SpawnPoints") {
			for (const object of layer.objects) {
				if (object.name === "mario") {
					entities.player = k.add(
						generatePlayer(k, k.vec2(object.x, object.y))
					);
				}
			}
		}
		if (layer.name === "Boundaries") {
			drawBoundaries(k, map, layer);
		}
		if (layer.name === "partWorld") {
			drawBoundaries(k, map, layer, "nextWorld");
		}
		if (layer.name === "Pipes") {
			drawBoundaries(k, map, layer, "pipes");
		}
		if (layer.name === "Assets") {
			drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
		}
	}

	cameraMove(k, mapData, entities.player);

	k.setGravity(mapHeight - 16 / 10);

	setPlayerMovement(k, entities.player);

	collidingPlayerWithBlock(k, "questionBlock", entities.player, "box-afterHit");

	enterThePipe(entities.player, k, "nextWorld", "world");
}
