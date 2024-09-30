import { generateGoomba, setGoombaAI } from "../entities/goomba";
import { generateKoopa, generateKoopaHead } from "../entities/koopa";
import { generatePlayer, setPlayerMovement } from "../entities/marioPlayer";
import { colorizeBackground, drawBoundaries, drawTiles } from "../utils";
import { fetchMapData } from "../utils";
export default async function world(k) {
	colorizeBackground(k, 99, 160, 253);
	const mapData = await fetchMapData("./src/assets/map/world1.json");
	const map = k.add([k.pos(0, 0)]);
	const mapHeight = 16 * 16;
	const windowHeight = window.innerHeight;
	const scale = parseFloat((windowHeight / mapHeight).toFixed(1));
	const cameraPosY = Math.round(mapHeight / 2);
	const visibleMap = Math.round(k.width() / scale / 2);
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
	k.camPos(
		k.vec2(Math.round((entities.player.worldPos().x * 25) / 3.5, cameraPosY))
	);
	k.onUpdate(() => {
		for (let i = 0; i < entities.koopaBody.length; i++) {
			const body = entities.koopaBody[i];
			const head = entities.koopaHead[i];

			if (body && head) {
				head.pos.x = body.pos.x;
			}
		}

		const marioPosX = Math.round(entities.player.worldPos().x);
		const campPosX = Math.round(k.camPos().x);
		if (marioPosX > campPosX) {
			k.camPos(k.vec2(marioPosX, cameraPosY));
		} else {
			k.camPos(k.camPos().x, cameraPosY);
		}

		const canvasWidth = k.width();
		const leftScreenEdge = campPosX - canvasWidth / 2 / scale;
		if (marioPosX < leftScreenEdge) {
			entities.player.pos.x = leftScreenEdge;
		}
	});

	k.setGravity(mapHeight - 16 / 10);
	setPlayerMovement(k, entities.player);

	for (const goomba of entities.goomba) {
		setGoombaAI(k, goomba, visibleMap);
	}
}
