import { playAnimIfNotPlaying } from "../utils";

export function generatePlayer(k, pos) {
	return [
		k.sprite("assets", {
			anim: "player-idle",
			animSpeed: 1.5,
		}), //offset , width and height hitbox
		k.area({
			shape: new k.Rect(k.vec2(0, 0), 16, 16),
			offset: k.vec2(2, 0), // Adjust the hitbox offset if needed
		}),
		k.body(),
		k.pos(pos),
		k.opacity(1),
		{
			speed: 80,
			isAttacking: false,
			direction: "idle",
			isSprinting: false,
		},
		"marioPlayer",
	];
}

export function setPlayerMovement(k, player) {
	const JUMP_FORCE = 190;
	k.onKeyDown((key) => {
		if (["left", "a"].includes(key)) {
			player.flipX = true;
			if (player.isGrounded()) {
				playAnimIfNotPlaying(player, "player-walking");
				player.direction = "left";
			}
			player.move(-player.speed, 0);
			return;
		}
		if (["right", "d"].includes(key)) {
			player.flipX = false;
			if (player.isGrounded()) {
				playAnimIfNotPlaying(player, "player-walking");
				player.direction = "right";
			}
			player.move(player.speed, 0);
			return;
		}
	});
	k.onKeyPress((key) => {
		if (["space"].includes(key)) {
			playAnimIfNotPlaying(player, "player-jump");
			if (player.isGrounded()) {
				player.jump(JUMP_FORCE);
				player.direction = "jump";
			}
			return;
		}
	});
	k.onKeyRelease(() => {
		if (player.isGrounded()) {
			player.direction = "idle";
			playAnimIfNotPlaying(player, "player-idle");
		}
		return;
	});
	k.onUpdate(() => {
		if (player.isGrounded()) {
			if (player.direction === "jump") {
				playAnimIfNotPlaying(player, "player-idle");
				player.direction = "idle";
			}
		}
	});
}
