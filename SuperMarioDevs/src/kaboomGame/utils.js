export function playAnimIfNotPlaying(gameObj, animName) {
	if (gameObj.curAnim() !== animName) {
		gameObj.play(animName);
	}
}
export function colorizeBackground(k, r, g, b) {
	k.add([k.rect(k.canvas.width, k.canvas.height), k.color(r, g, b), k.fixed()]);
}
export async function fetchMapData(mapPath) {
	try {
		const response = await fetch(mapPath);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching map data:", error);
		return null; // Handle the error appropriately
	}
}

export function drawTiles(k, map, layer, tileheight, tilewidth) {
	let nbOfDrawnTiles = 0;
	const tilePos = k.vec2(0, 0);

	for (const tile of layer.data) {
		if (nbOfDrawnTiles % layer.width === 0) {
			tilePos.x = 0;
			tilePos.y += tileheight;
		} else {
			tilePos.x += tilewidth;
		}

		nbOfDrawnTiles++;
		if (tile === 0) continue;
		let piranha;
		let piranhaHead;
		switch (tile) {
			case 1:
				map.add([
					k.sprite("assets", {
						frame: tile - 1,
						anim: "box-anim",
						animSpeed: 0.5,
					}),
					k.area(),
					k.body({ isStatic: true }),
					k.pos(tilePos),
					k.offscreen(),
					"tile",
					"questionBlock",
				]);
				break;

			case 18:
				map.add([
					k.sprite("assets", {
						frame: tile - 1,
					}),
					k.area(),
					k.body({ isStatic: true }),
					k.pos(tilePos),
					k.offscreen(),
					"tile",
					"block",
				]);
				break;

			case 265:
				piranha = map.add([
					k.sprite("assets", {
						frame: tile - 1,
						anim: "piranha-idle",
						animSpeed: 0.5,
					}),
					k.area(),
					k.body({ isStatic: true }),
					k.pos(tilePos.add(8, 0)),
					k.z(1), // Set the initial Z-index to be in front of the tiles
					"tile",
					"piranhaBody",
					"monster",
				]);
				togglePiranhaVisibility(k, piranha);
				break;

			case 229:
				piranhaHead = map.add([
					k.sprite("assets", {
						frame: tile - 1,
						anim: "piranha-idle-head",
						animSpeed: 0.5,
					}),
					k.area({
						shape: new k.Rect(k.vec2(0, 0), 16, 8),
						offset: k.vec2(0, 8), // Adjust the hitbox offset if needed
					}),
					k.body({ isStatic: true }),
					k.pos(tilePos.add(8, 0)),
					k.offscreen(),
					"tile",
					"piranhaHead",
					"monster",
				]);
				togglePiranhaVisibility(k, piranhaHead);
				break;

			case 25:
				map.add([
					k.sprite("assets", {
						frame: tile - 1,
						anim: "coin-anim",
						animSpeed: 0.5,
					}),
					k.area({
						shape: new k.Rect(k.vec2(0, 0), 16, 16),
						offset: k.vec2(0, 0),
					}),
					k.body({ isStatic: true }),
					k.pos(tilePos),
					k.offscreen(),
					"tile",
					"coin",
				]);
				break;

			default:
				map.add([
					k.sprite("assets", { frame: tile - 1 }),
					k.pos(tilePos),
					k.offscreen(),
					"tile",
				]);
				break;
		}
	}
}

export function generateColliderComponents(k, width, height, pos, tag) {
	return [
		k.area({ shape: new k.Rect(k.vec2(0, 16), width, height) }),
		k.pos(pos),
		k.body({ isStatic: true }),
		k.offscreen(),
		tag,
	];
}

export function drawBoundaries(k, map, layer, tag = "terrain") {
	for (const object of layer.objects) {
		map.add(
			generateColliderComponents(
				k,
				object.width,
				object.height,
				k.vec2(object.x, object.y),
				tag
			)
		);
	}
}

//terrain
export function setMonsterAi(k, monster, visibleMap, animation) {
	k.onUpdate(() => {
		const isVisible = k.camPos().x + visibleMap;
		if (monster.pos.x < isVisible) {
			if (monster.state === "right") {
				monster.move(monster.speed, 0); // Move to the right
			} else if (monster.state === "left") {
				monster.move(-monster.speed, 0); // Move to the left
			}
		}
	});
	monster.onCollide("terrain", (terrain) => {
		const monsterBottom = monster.pos.y; // Bottom of monster
		const terrainTop = terrain.pos.y; // Top of terrain

		if (monsterBottom === terrainTop || monsterBottom < terrainTop) {
			monster.enterState("left");
			return;
		}
		if (monster.state === "right") {
			monster.enterState("left");
			return;
		} else {
			monster.enterState("right");
			return;
		}
	});
	monster.onCollide("monster", (mon) => {
		const isKoopaShell = monster.curAnim() === "koopa-shell";
		const isGoombaWalking = mon.curAnim() === "goomba-walking";

		if (isKoopaShell && isGoombaWalking) {
			mon.area.shape.height = 8;
			mon.area.offset.y = 8;
			mon.speed = 0;
			mon.collisionIgnore = ["koopa", "goomba", "player"];
			playAnimIfNotPlaying(mon, "goomba-death");
			k.wait(1, () => {
				k.destroy(mon);
			});
		}

		const newState = monster.state === "left" ? "right" : "left";
		monster.enterState(newState);
	});

	const left = monster.onStateEnter("left", () => {
		monster.flipX = true;
		//brute force method to block reverting back koopa animation when colliding with monster
		if (
			monster.curAnim() != "koopa-shell" &&
			monster.curAnim() != "goomba-death"
		) {
			playAnimIfNotPlaying(monster, animation);
		}
	});

	const right = monster.onStateEnter("right", () => {
		monster.flipX = false;
		if (
			monster.curAnim() != "koopa-shell" &&
			monster.curAnim() != "goomba-death"
		) {
			playAnimIfNotPlaying(monster, animation);
		}
	});

	k.onSceneLeave(() => {
		left.cancel();
		right.cancel();
	});
}

export async function togglePiranhaVisibility(k, piranha) {
	piranha.z = -1;

	async function hideAndShow() {
		let initialY = piranha.pos.y;
		const moveBy = 26;
		const duration = 1;
		const steps = 40;
		const delayBetweenSteps = duration / steps;
		while (true) {
			for (let i = 0; i <= steps; i++) {
				piranha.pos.y = initialY + moveBy * (i / steps);
				await k.wait(delayBetweenSteps);
			}

			await k.wait(3);
			for (let i = 0; i <= steps; i++) {
				piranha.pos.y = initialY + moveBy - moveBy * (i / steps);
				await k.wait(delayBetweenSteps);
			}
			await k.wait(3);
		}
	}

	hideAndShow(); // Start the smooth hide-and-show cycle
}

export function collidingPlayerWithBlock(k, tag, player, animName) {
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
				playAnimIfNotPlaying(block, animName);
			}
		}
	});
}
export function collidingPlayerWithGoomba(k, tag, player, animName) {
	player.onCollide(tag, (goomba) => {
		if (player.worldPos().y < goomba.worldPos().y) {
			if (animName) {
				playAnimIfNotPlaying(goomba, animName);
				goomba.area.shape.height = 8;
				goomba.area.offset.y = 8;
				goomba.speed = 0;
				k.wait(0.75, () => {
					k.destroy(goomba);
				});
			}
		}
	});
}

export async function collidingPlayerWithKoopa(
	k,
	tagHead,
	tagBody,
	player,
	arrHead,
	arrBody,
	animName
) {
	player.onCollide(tagHead, (koopaHead) => {
		if (player.worldPos().y < koopaHead.worldPos().y) {
			const index = arrHead.indexOf(koopaHead);
			let monsterBody = arrBody[index];
			if (monsterBody) {
				playAnimIfNotPlaying(monsterBody, animName);
				monsterBody.speed = 0;
				monsterBody.canChangeState = true;
			}
			k.destroy(koopaHead);
		}
	});
	player.onCollide(tagBody, (koopaBody) => {
		if (!koopaBody.canChangeState) return;
		if (koopaBody.curAnim() === "koopa-shell") {
			k.wait(0.1, () => {
				koopaBody.speed = 160;
				koopaBody.canChangeState = false;
			});
		}
		if (player.direction === "left") {
			koopaBody.enterState("left");
		} else {
			koopaBody.enterState("right");
		}
		k.wait(1, () => {
			koopaBody.canChangeState = true;
		});
	});
}
export function cameraMove(k, mapData, player) {
	const windowHeight = window.innerHeight;
	const mapHeight = mapData.height * mapData.tileheight;
	const camPosY = mapHeight / 2 + 14;
	const mapWidth = mapData.width * mapData.tilewidth;
	const scale = parseFloat((windowHeight / mapHeight).toFixed(1));
	const threshold = Math.round(mapWidth - k.width() / 2 / scale);
	const visibleMap = Math.round(mapWidth - threshold);

	k.camScale(scale);
	k.camPos(k.vec2(visibleMap, camPosY));

	k.onUpdate(() => {
		let camPosX = k.camPos().x;
		let leftMapBoundaries = camPosX - visibleMap;
		let marioPosX = Math.round(player.worldPos().x);

		if (marioPosX >= threshold) {
			k.camPos(k.vec2(threshold, camPosY));
		}
		if (marioPosX > camPosX && marioPosX < threshold) {
			k.camPos(k.vec2(marioPosX, camPosY));
		}
		if (player.pos.x <= leftMapBoundaries) {
			player.pos.x = leftMapBoundaries + 1;
		}
	});
}

export function playerDeathSentence(k, player, monsterTag) {
	let deathTriggered = false;

	player.onCollide(monsterTag, async (monster) => {
		if (monster.curAnim() === "koopa-shell" && monster.speed === 0) return;
		if (deathTriggered) return;
		if (
			player.pos.y >= monster.pos.y ||
			monster.curAnim() === "piranha-idle-head"
		) {
			deathTriggered = true;
			player.direction = null;
			player.speed = 0;
			player.z = 2;
			player.collisionIgnore = ["monster", "tile", "koopaHead", "terrain"];
			player.gravityScale = 0;
			playAnimIfNotPlaying(player, "player-death");

			k.tween(
				player.pos.y,
				player.pos.y - 40,
				0.5,
				(val) => (player.pos.y = val),
				k.easeOutQuad
			);
			k.wait(3, () => {
				k.tween(
					player.pos.y,
					player.pos.y + 100,
					0.75,
					(val) => (player.pos.y = val),
					k.easeInQuad
				).then(() => {
					k.destroy(player);
					k.go("startWorld");
				});
			});
		}
	});

	k.onUpdate(() => {
		if (!deathTriggered && player.pos.y > 248) {
			deathTriggered = true;
			player.direction = null;
			player.speed = 0;
			player.z = 2;
			player.collisionIgnore = ["monster", "tile", "koopaHead", "terrain"];
			player.gravityScale = 0;
			player.jumpForce = 0;
			playAnimIfNotPlaying(player, "player-death");

			k.tween(
				player.pos.y,
				player.pos.y - 80,
				1,
				(val) => (player.pos.y = val),
				k.easeOutQuad
			);
			k.wait(3, () => {
				k.tween(
					player.pos.y,
					player.pos.y + 40,
					0.75,
					(val) => (player.pos.y = val),
					k.easeInQuad
				).then(() => {
					k.destroy(player);
					k.go("startWorld");
				});
			});
		}
	});
}
