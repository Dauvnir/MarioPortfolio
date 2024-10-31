import {
	generatePlayer,
	setPlayerMovement,
	touchPlayerMovement,
} from "../entities/marioPlayer";
import {
	cameraMove,
	colorizeBackground,
	drawBoundaries,
	drawTiles,
	enterThePipe,
	fetchMapData,
	playAnimIfNotPlaying,
} from "../utils";

export async function startWorld(k) {
	colorizeBackground(k, 99, 160, 253);
	const mapData = await fetchMapData("/map/startWorld.json");
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
	touchPlayerMovement(k, entities.player);

	collidingPlayerWithBlockAndShowProfile(
		k,
		"questionBlock",
		entities.player,
		"box-afterHit"
	);

	enterThePipe(entities.player, k, "nextWorld", "world");
}

function collidingPlayerWithBlockAndShowProfile(k, tag, player, animName) {
	player.onCollide(tag, (block) => {
		if (player.worldPos().y > block.worldPos().y) {
			k.tween(
				block.pos.y,
				block.pos.y - 8,
				0.1, // Duration (0.1 seconds)
				(val) => (block.pos.y = val), // Update the block's Y position as tween progresses
				k.easeOutQuad // Optional easing function for smoothness
			).then(() => {
				k.tween(
					block.pos.y,
					block.pos.y + 8,
					0.1, // Duration (0.1 seconds)
					(val) => (block.pos.y = val),
					k.easeInQuad // Smooth ease-in easing for the return
				);
			});
			if (animName) {
				k.wait(0.01, () => {
					playAnimIfNotPlaying(block, animName);
				});
			}
		}
	});
}
