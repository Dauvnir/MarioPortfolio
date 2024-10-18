// SomeOtherFile.js
import { getKaboomInstance } from "./KaboomContext";
import world from "./scenes/world";
import assets from "../assets/tilesets/Tileset.png";
import { tweenLevel } from "./scenes/tweenLevel";
import world2 from "./scenes/world2";
import { startWorld } from "./scenes/startWorld";
export function mainGame() {
	const k = getKaboomInstance();

	k.loadSprite("assets", assets, {
		sliceX: 36,
		sliceY: 11,
		anims: {
			"player-idle": { from: 253, to: 253, loop: true },
			"player-walking": { from: 253, to: 256, loop: true },
			"player-jump": { from: 258, to: 258 },
			"player-death": { from: 260, to: 260 },
			"player-hold-pole": { from: 259, to: 259 },
			"goomba-death": { from: 261, to: 261 },
			"goomba-idle": { from: 262, to: 262 },
			"goomba-walking": { from: 262, to: 263, loop: true },
			"koopa-head-walking": { from: 230, to: 231, loop: true },
			"koopa-body-walking": { from: 266, to: 267, loop: true },
			"koopa-shell": { from: 268, to: 268, loop: true },
			"piranha-idle": { from: 264, to: 265, loop: true },
			"piranha-idle-head": { from: 228, to: 229, loop: true },
			"box-anim": { from: 0, to: 2, loop: true },
			"box-afterHit": { from: 3, to: 3, loop: true },
			"coin-anim": { from: 24, to: 26, loop: true },
			"coin-anim-afterBlockHit": { from: 64, to: 67, loop: true },
		},
		animspeed: {},
	}).then(() => {
		console.log("Tileset loaded successfully!");
	});

	const scenes = {
		world,
		tweenLevel,
		world2,
		startWorld,
	};

	for (const sceneName in scenes) {
		k.scene(sceneName, () => scenes[sceneName](k));
	}

	k.go("startWorld");
}
