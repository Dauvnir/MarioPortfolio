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

		if (tile === 1) {
			map.add([
				k.sprite("assets", {
					frame: tile - 1,
					anim: "box-anim",
					animSpeed: 0.5,
				}),
				k.pos(tilePos),
				k.offscreen(),
				"tile",
			]);
		} else if (tile === 265) {
			const piranha = map.add([
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
			]);

			togglePiranhaVisibility(k, piranha);
		} else if (tile === 229) {
			const piranhaHead = map.add([
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
			]);
			togglePiranhaVisibility(k, piranhaHead);
		} else {
			map.add([
				k.sprite("assets", { frame: tile - 1 }),
				k.pos(tilePos),
				k.offscreen(),
				"tile",
			]);
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

export function drawBoundaries(k, map, layer) {
	for (const object of layer.objects) {
		map.add(
			generateColliderComponents(
				k,
				object.width,
				object.height,
				k.vec2(object.x, object.y),
				"terrain"
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
		// Define the bottom of the monster and the top of the terrain
		const monsterBottom = monster.pos.y; // Bottom of monster
		const terrainTop = terrain.pos.y; // Top of terrain

		// Check if the monster is colliding with the terrain from above
		if (monsterBottom === terrainTop) {
			monster.enterState("left");
			return;
		}
		// Check if the monster is moving right or left and reverse direction
		if (monster.state === "right") {
			monster.enterState("left");
			return;
		} else {
			monster.enterState("right");
			return;
		}
	});
	// Handle monster-to-monster collision and reverse direction based on position
	monster.onCollide("monster", () => {
		if (monster.state === "left") {
			monster.enterState("right");
			return;
		} else {
			monster.enterState("left");
			return;
		}
	});

	const left = monster.onStateEnter("left", () => {
		monster.flipX = true;
		playAnimIfNotPlaying(monster, animation);
	});

	const right = monster.onStateEnter("right", () => {
		monster.flipX = false;
		playAnimIfNotPlaying(monster, animation);
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
		const moveBy = 24;
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
