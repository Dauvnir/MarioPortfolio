export function generatePlayer(k, pos) {
	return [
		k.sprite("assets", {
			anim: "player-idle",
		}), //offset , width and height hitbox
		k.area({
			shape: new k.Rect(k.vec2(0, 0), 16, 16),
			offset: k.vec2(2, 0), // Adjust the hitbox offset if needed
		}),
		k.body(),
		k.pos(pos),
		k.opacity(1),
		{
			speed: 120,
			isAttacking: false,
		},
		"marioPlayer",
	];
}
