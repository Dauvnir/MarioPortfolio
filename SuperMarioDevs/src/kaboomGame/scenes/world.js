import { generateGoomba } from "../entities/goomba";
import { generateKoopa, generateKoopaHead } from "../entities/koopa";
import { generatePlayer } from "../entities/marioPlayer";
import { colorizeBackground, drawBoundaries, drawTiles } from "../utils";
import { fetchMapData } from "../utils";
export default async function world(k) {
	colorizeBackground(k, 99, 160, 253);
	const mapData = await fetchMapData("./src/assets/map/world1.json");
	const map = k.add([k.pos(0, 0)]);
	const mapHeight = 16 * 16;
	const windowHeight = window.innerHeight;
	const scale = parseFloat((windowHeight / mapHeight).toFixed(1));
	const campPosX = k.camPos().x;
	const cameraPosY = mapHeight / 2;

	const entities = {
		player: null,
		goomba: [],
		koopaBody: [],
		koopaHead: [],
	};

	const layers = mapData.layers;
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
				if (object.name === "goomba") {
					entities.goomba.push(
						map.add(generateGoomba(k, k.vec2(object.x, object.y)))
					);
				}
				if (object.name === "koopa") {
					entities.koopaBody.push(
						map.add(generateKoopa(k, k.vec2(object.x, object.y)))
					);
				}
				if (object.name === "koopaHead") {
					entities.koopaHead.push(
						map.add(generateKoopaHead(k, k.vec2(object.x, object.y), map))
					);
					console.log(map);
				}
			}
			continue;
		}

		if (layer.name === "WorldPart") {
			continue;
		}
		if (layer.name === "SecretLevel") {
			continue;
		}
		if (layer.name === "Pipes") {
			drawBoundaries(k, map, layer);
		}
		if (layer.name === "Blocks") {
			drawBoundaries(k, map, layer);
		}
		if (layer.name === "Assets") {
			drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
		}
	}

	for (let i = 0; i < entities.koopaBody.length; i++) {
		const body = entities.koopaBody[i];
		const head = entities.koopaHead[i];

		if (body && head) {
			head.follow = {
				obj: body,
				offset: k.vec2(0, 0), // Offset to position the head above the body
			};
			body.follow = {
				obj: head,
				offset: k.vec2(0, 0),
			};
		}
	}
	k.camScale(scale);
	//camer intital position (entities.player.worldPos().x * 25) / 3.5
	k.camPos(k.vec2((entities.player.worldPos().x * 25) / 3.5, cameraPosY));
	k.onUpdate(() => {
		for (let i = 0; i < entities.koopaBody.length; i++) {
			const body = entities.koopaBody[i];
			const head = entities.koopaHead[i];

			if (body && head) {
				head.pos.x = body.pos.x;
			}
		}
		const marioPosX = entities.player.worldPos().x;
		if (marioPosX > campPosX) {
			k.camPos(k.vec2(marioPosX, cameraPosY));
		} else {
			k.camPos(k.camPos().x, cameraPosY);
		}
	});
	k.setGravity(mapHeight - 16 * 2);
}
