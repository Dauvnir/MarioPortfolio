// SomeOtherFile.js
import { getKaboomInstance } from "./KaboomContext";
import world from "./scenes/world";
import assets from "../assets/tilesets/Tileset.png";
export function mainGame() {
	const k = getKaboomInstance();

	k.loadSprite("assets", assets, {
		sliceX: 36,
		sliceY: 11,
		anims: {
			"player-idle": { from: 253, to: 253, loop: true },
			"player-walking": { from: 254, to: 256, loop: true },
			"player-jump": { from: 258, to: 258 },
			"goomba-death": [261],
			"goomba-idle": { from: 262, to: 262 },
			"goomba-walking": { from: 262, to: 263, loop: true },
			"koopa-head-walking": { from: 230, to: 231, loop: true },
			"koopa-body-walking": { from: 266, to: 267, loop: true },
			"koopa-shell": [268],
			"piranha-idle": { from: 264, to: 265, loop: true },
			"piranha-idle-head": { from: 228, to: 229, loop: true },
			"box-anim": { from: 0, to: 2, loop: true },
		},
		animspeed: {},
	}).then(() => {
		console.log("Tileset loaded successfully!");
	});

	const scenes = {
		world,
	};

	// Register all scenes
	for (const sceneName in scenes) {
		k.scene(sceneName, () => scenes[sceneName](k));
	}

	k.go("world");
}
