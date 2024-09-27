import { useEffect, useRef } from "react";
import kaboom from "kaboom";
import blockTileset from "../assets/tilesets/blocksTile.png";
import brick from "../assets/tilesets/brick.png";
import marioSprite from "../assets/tilesets/mario-1-1.png";
//mario screen 256px x 200px ?
const GamePage = () => {
	const canvasRef = useRef(null);
	useEffect(() => {
		//----------------------Init Kaboom
		const k = kaboom({
			global: true,
			debug: false,
			fullscrean: true,
			clearColor: [0, 0, 0, 1],
			crisp: true,
			canvas: canvasRef.current,
		});
		//------------------------Variables
		const blockSize = k.height() / 16;
		const aspectRatio = blockSize / 16;
		const MOVE_SPEED = 120;
		const JUMP_FORCE = 320;
		const canvasHeight = k.height();
		const canvasWidth = k.width();
		const cameraPositionY = canvasHeight / 2;
		const DOUBLE_PRESS_DELAY = 0.5;
		let isSprinting = false;
		let lastKeyPressTime = 0;
		let direction = 0; // -1 left, 0 center, 1 right
		let isMarioOnGround = true;

		//------------------------Load Sprites
		k.loadSprite("blockTileset", blockTileset, {
			sliceX: 5, // Assuming 5 columns
			sliceY: 4, // Assuming 4 rows
		});
		k.loadSprite("brick", brick);
		k.loadSprite("mario", marioSprite);
		//-------------------------Level and map config
		k.scene("game", () => {
			const map = [
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"                                                                                                                                                                                                                                ",
				"=====================================================================  ===============   ================================================================  =====================================================================",
				"=====================================================================  ===============   ================================================================  =====================================================================",
			];

			const levelCfg = {
				tileWidth: blockSize, // Width of each tile
				tileHeight: blockSize,
				tiles: {
					"=": () => [
						k.sprite("brick"),
						k.area(),
						k.body({ isStatic: true }),
						k.pos(0, 0),
						k.scale(aspectRatio),
					],
				},
			};

			k.setGravity(canvasHeight - blockSize * 2);

			k.addLevel(map, levelCfg);
			//--------------------------------- Mario config
			const mario = k.add([
				k.area(),
				k.scale(aspectRatio),
				k.pos(blockSize * 3, k.height() - blockSize * 3),
				k.sprite("mario"),
				k.body(),
			]);
			//---------------------------------- Key config

			function onDoublePress() {
				isSprinting = true;
			}

			function checkToFire() {
				const currentTime = k.time();

				if (currentTime - lastKeyPressTime <= DOUBLE_PRESS_DELAY) {
					onDoublePress();
				} else {
					isSprinting = false;
				}
				lastKeyPressTime = currentTime;
			}

			k.onKeyDown("left", () => {
				if (!isMarioOnGround && direction === 1) {
					return;
				}
				direction = -1;

				mario.move(isSprinting ? -MOVE_SPEED * 2 : -MOVE_SPEED, 0);
			});

			k.onKeyDown("right", () => {
				if (!isMarioOnGround && direction === -1) {
					return;
				}
				direction = 1;

				mario.move(isSprinting ? +MOVE_SPEED * 2 : +MOVE_SPEED, 0);
			});
			k.onKeyPress("left", () => {
				checkToFire();
			});

			k.onKeyPress("right", () => {
				checkToFire();
			});
			k.onKeyPress("space", () => {
				if (mario.isGrounded()) {
					mario.jump(JUMP_FORCE);
				}
			});
			k.onKeyRelease("left", () => {
				isSprinting = false;
			});
			k.onKeyRelease("right", () => {
				isSprinting = false;
			});
			//------------------------ Camera config
			k.onUpdate(() => {
				isMarioOnGround = mario.isGrounded();
				const marioPos = mario.pos;
				const camPosX = k.camPos().x;
				const screenLeftEdge = camPosX - canvasWidth / 2;
				// Jeśli Mario jest na prawo od środka ekranu, kamera podąża za nim
				if (marioPos.x > k.camPos().x) {
					k.camPos(marioPos.x, cameraPositionY); // Kamera śledzi Mario tylko gdy idzie w prawo
				} else {
					// Jeśli Mario jest na lewo od aktualnej pozycji kamery, kamera nie przesuwa się w lewo
					k.camPos(k.camPos().x, cameraPositionY); // Kamera pozostaje na bieżącej pozycji
				}
				// Zapobieganie wychodzeniu Mario poza lewą krawędź ekranu
				if (marioPos.x < 0) {
					marioPos.x = 1;
				}
				if (marioPos.x < screenLeftEdge) {
					marioPos.x = screenLeftEdge + 1;
				}
			});
		});

		// Start the game scene
		k.go("game");
		return () => {
			k.destroyAll();
		};
	}, []);

	return <canvas ref={canvasRef}></canvas>;
};

export default GamePage;
