import { playAnimIfNotPlaying } from "../utils";

export function generateGoomba(k, pos) {
	return [
		k.sprite("assets", {
			anim: "goomba-idle",
			animSpeed: 0.5,
		}), //offset , width and height hitbox
		k.area({
			shape: new k.Rect(k.vec2(0, 0), 16, 16),
			offset: k.vec2(0, 0), // Adjust the hitbox offset if needed
		}),
		k.body(),
		k.pos(pos),
		k.offscreen(),
		k.opacity(1),
		k.state("left", ["left", "right"]),
		{
			speed: 20,
		},
		"goomba",
	];
}
//terrain
export function setGoombaAI(k, goomba, visibleMap) {
	k.onUpdate(() => {
		const isVisible = k.camPos().x + visibleMap;
		if (goomba.pos.x < isVisible) {
			if (goomba.state === "right") {
				goomba.move(goomba.speed, 0); // Move to the right
			} else if (goomba.state === "left") {
				goomba.move(-goomba.speed, 0); // Move to the left
			}
		}
	});
	goomba.onCollide("terrain", (terrain) => {
		// Define the bottom of the goomba and the top of the terrain
		const goombaBottom = goomba.pos.y; // Bottom of goomba
		const terrainTop = terrain.pos.y; // Top of terrain

		// Check if the goomba is colliding with the terrain from above
		if (goombaBottom === terrainTop) {
			goomba.enterState("left");
			return;
		}
		// Check if the goomba is moving right or left and reverse direction
		if (goomba.state === "right") {
			goomba.enterState("left");
			return;
		} else {
			goomba.enterState("right");
			return;
		}
	});
	// Handle Goomba-to-Goomba collision and reverse direction based on position
	goomba.onCollide("goomba", (otherGoomba) => {
		const yDiff = goomba.pos.y - otherGoomba.pos.y;
		const xDiff = goomba.pos.x - otherGoomba.pos.x;

		if (Math.abs(yDiff) > Math.abs(xDiff)) {
			if (yDiff > 0) {
				goomba.move(0, 5);
			} else {
				goomba.move(0, -5);
			}
		} else {
			if (goomba.state === "right") {
				goomba.enterState("left");
			} else {
				goomba.enterState("right");
			}
		}
	});

	const left = goomba.onStateEnter("left", () => {
		goomba.flipX = true;
		playAnimIfNotPlaying(goomba, "goomba-walking");
	});

	const right = goomba.onStateEnter("right", () => {
		goomba.flipX = false;
		playAnimIfNotPlaying(goomba, "goomba-walking");
	});

	k.onSceneLeave(() => {
		left.cancel();
		right.cancel();
	});
}
