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

		map.add([
			k.sprite("assets", { frame: tile - 1 }),
			k.pos(tilePos),
			k.offscreen(),
		]);
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
				object.name
			)
		);
	}
}
