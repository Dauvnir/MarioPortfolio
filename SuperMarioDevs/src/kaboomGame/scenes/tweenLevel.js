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
			drawBoundaries(k, map, layer, "pipes");
		}
		if (layer.name === "Assets") {
			drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
		}
	}

	cameraMove(k, mapData, entities.player);

	k.setGravity(mapHeight - 16 / 10);

	setPlayerMovement(k, entities.player);

	entities.player.onCollide("coin", (coin) => {
		k.destroy(coin);
	});

	entities.player.onCollide("nextWorld", (block) => {
		const player = entities.player;
		if (player.isGrounded() && player.pos.y > block.pos.y) {
			player.z = -1;
			player.speed = 0;
			player.direction = null;
			player.jumpForce = 0;
			player.collisionIgnore = ["pipes", "nextWorld"];
			player.gravityScale = 0;
			player.play("player-walking");

			k.tween(
				player.pos.x,
				player.pos.x + 4,
				0.2,
				(val) => (player.pos.x = val),
				k.easeInQuad
			).then(() => {
				k.tween(
					player.pos.y,
					player.pos.y - 4,
					0.2,
					(val) => (player.pos.y = val),
					k.easeInQuad
				).then(() => {
					k.tween(
						player.pos.x,
						player.pos.x + 32,
						0.9,
						(val) => (player.pos.x = val),
						k.easeInQuad
					).then(() => {
						k.go("world2");
					});
				});
			});
		}
	});
}
