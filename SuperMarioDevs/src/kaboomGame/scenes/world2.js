import { generateGoomba } from "../entities/goomba";
import {
	generateKoopa,
	generateKoopaHead,
	synchroniseHead,
} from "../entities/koopa";
import { generatePlayer, setPlayerMovement } from "../entities/marioPlayer";
import {
	cameraMove,
	collidingPlayerWithBlock,
	collidingPlayerWithGoomba,
	collidingPlayerWithKoopa,
	colorizeBackground,
	drawBoundaries,
	drawTiles,
	fetchMapData,
	hugFinishPole,
	playerDeathSentence,
	setMonsterAi,
} from "../utils";

export default async function world2(k) {
	colorizeBackground(k, 99, 160, 253);

	const mapData = await fetchMapData("./src/assets/map/world2.json");
	const map = k.add([k.pos(0, 0)]);
	const mapHeight = mapData.height * mapData.tileheight;
	const windowHeight = window.innerHeight;
	const scale = parseFloat((windowHeight / mapHeight).toFixed(1));
	const visibleMap = Math.round(k.width() / scale / 2);

	const entities = {
		player: null,
		goomba: [],
		koopaBody: [],
		koopaHead: [],
		piranhaBody: [],
		piranhaHead: [],
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
		if (layer.name === "Boundaries") {
			drawBoundaries(k, map, layer);
		}
		if (layer.name === "WorldStart") {
			drawBoundaries(k, map, layer, "startWorld");
		}
		if (layer.name === "Pipes") {
			drawBoundaries(k, map, layer);
		}
		if (layer.name === "Assets2") {
			drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
		}
	}

	for (let i = 0; i < entities.koopaBody.length; i++) {
		const body = entities.koopaBody[i];
		const head = entities.koopaHead[i];

		if (body && head) {
			head.follow = {
				obj: body,
				offset: k.vec2(0, 0),
			};
			body.follow = {
				obj: head,
				offset: k.vec2(0, 0),
			};
		}
	}

	cameraMove(k, mapData, entities.player);

	k.onUpdate(() => {
		for (let i = 0; i < entities.koopaBody.length; i++) {
			const body = entities.koopaBody[i];
			const head = entities.koopaHead[i];

			if (body && head) {
				head.pos.x = body.pos.x;
			}
		}
		synchroniseHead(k, entities.koopaHead, entities.koopaBody);
	});
	k.setGravity(mapHeight - 16 / 10);
	setPlayerMovement(k, entities.player);

	for (const goomba of entities.goomba) {
		setMonsterAi(k, goomba, visibleMap, "goomba-walking");
	}
	for (const koopa of entities.koopaBody) {
		setMonsterAi(k, koopa, visibleMap, "koopa-body-walking");
	}

	entities.player.onCollide("startWorld", () => {
		k.go("startWorld");
	});
	collidingPlayerWithBlock(k, "questionBlock", entities.player, "box-afterHit");
	collidingPlayerWithBlock(k, "block", entities.player);
	collidingPlayerWithGoomba(k, "goomba", entities.player, "goomba-death");
	collidingPlayerWithKoopa(
		k,
		"koopaHead",
		"koopa",
		entities.player,
		entities.koopaHead,
		entities.koopaBody,
		"koopa-shell"
	);
	playerDeathSentence(k, entities.player, "monster");
	hugFinishPole(k, entities.player);
}
