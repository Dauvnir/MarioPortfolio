export function generateKoopa(k, pos) {
	return [
		k.sprite("assets", {
			anim: "koopa-body-walking",
			animSpeed: 0.4,
		}),
		k.area({
			shape: new k.Rect(k.vec2(0, 0), 16, 16),
			offset: k.vec2(0, 0), // Adjust the hitbox offset if needed
		}),
		k.body(),
		k.pos(pos),
		k.opacity(1),
		k.offscreen(),
		{
			speed: 80,
			direction: "left",
		},
		"koopa",
	];
}

export function generateKoopaHead(k, pos) {
	const koopaBody = k.get("koopa");
	if (!koopaBody) {
		console.error("Koopa body not found!");
		return null;
	}
	return [
		k.sprite("assets", {
			anim: "koopa-head-walking",
			animSpeed: 0.4,
		}),
		k.pos(pos.add(0, 0)), // Position the head above the body
		k.offscreen(),
		k.area({
			shape: new k.Rect(k.vec2(0, 0), 16, 16),
			offset: k.vec2(0, 0), // Adjust the hitbox offset if needed
		}),
		k.body(),
		k.opacity(1),
		"koopaHead",
	];
}
