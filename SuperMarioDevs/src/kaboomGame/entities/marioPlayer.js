import { playAnimIfNotPlaying } from "../utils";

export function generatePlayer(k, pos) {
	return [
		k.sprite("assets", {
			anim: "player-idle",
			animSpeed: 1,
		}),
		k.area({
			shape: new k.Rect(k.vec2(0, 0), 16, 16),
			offset: k.vec2(2, 0),
		}),
		k.body(),
		k.pos(pos),
		k.opacity(1),
		{
			speed: 70,
			jumpforce: 180,
			isAttacking: false,
			direction: "right",
			isIdle: true,
			isSprinting: false,
			jumped: false,
		},
		"marioPlayer",
	];
}

export function setPlayerMovement(k, player) {
	k.onKeyDown((key) => {
		if (player.direction === null) return;

		if (["left"].includes(key)) {
			player.flipX = true;
			player.direction = "left";
			player.isIdle = false;
			player.move(-player.speed, 0);
			if (player.isGrounded()) {
				playAnimIfNotPlaying(player, "player-walking");
			}
			return;
		}
		if (["right"].includes(key)) {
			player.flipX = false;
			player.direction = "right";
			player.isIdle = false;
			player.move(player.speed, 0);
			if (player.isGrounded()) {
				playAnimIfNotPlaying(player, "player-walking");
			}
			return;
		}
		if (["d"].includes(key)) {
			player.speed = 140;
			player.animSpeed = 2;
			player.isSprinting = true;
		}
	});
	k.onKeyPress((key) => {
		if (player.direction === null) return;

		if (["space"].includes(key)) {
			playAnimIfNotPlaying(player, "player-jump");
			if (player.isGrounded()) {
				player.jump(player.jumpforce);
				player.jumped = true;
				player.isIdle = false;
			}
			return;
		}
	});
	k.onKeyRelease((key) => {
		if (["d"].includes(key)) {
			player.speed = 70;
			player.animSpeed = 1;
			player.isSprinting = false;
		}
		if (player.direction === null) return;
		if (player.isGrounded() && player.curAnim() !== "player-hold-pole") {
			player.isIdle = true;
			playAnimIfNotPlaying(player, "player-idle");
		}
		return;
	});
	k.onUpdate(() => {
		let currentAnim = player.curAnim();
		if (player.direction === null) return;
		if (
			player.isGrounded() &&
			player.jumped === true &&
			currentAnim !== "player-hold-pole"
		) {
			playAnimIfNotPlaying(player, "player-idle");
			player.jumped = false;
		}
	});
}