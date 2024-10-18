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
	enterThePipe,
	generateCoinsAfterHit,
	onKillingMonster,
	playerDeathSentence,
	setMonsterAi,
} from "../utils";
import { fetchMapData } from "../utils";
export default async function world(k) {
	colorizeBackground(k, 99, 160, 253);
	const mapData = await fetchMapData("./src/assets/map/world1.json");
	const map = k.add([k.pos(0, 0)]);
	const windowHeight = window.innerHeight;
	const mapWidth = mapData.width * mapData.tilewidth;
	const mapHeight = mapData.height * mapData.tileheight;
	const scale = parseFloat((windowHeight / mapHeight).toFixed(1));
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
		if (layer.name === "Pipes") {
			drawBoundaries(k, map, layer, "pipes");
		}
		if (layer.name === "ChangeMap") {
			drawBoundaries(k, map, layer, "nextWorld");
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

	const threshold = Math.round(mapWidth - k.width() / 2 / scale);
	const visibleMap = Math.round(mapWidth - threshold);

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
		setMonsterAi(k, goomba, visibleMap, "goomba-walking", map);
	}

	for (const koopa of entities.koopaBody) {
		setMonsterAi(k, koopa, visibleMap, "koopa-body-walking", map);
	}

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
	generateCoinsAfterHit(k, entities.player, "questionBlock", map);
	onKillingMonster(k, map);
	enterThePipe(entities.player, k, "nextWorld", "tweenLevel");
}
