import kaboom from "kaboom";

let k = null;

export const kaboomContext = (canvasElement) => {
	if (!k) {
		k = kaboom({
			global: false,
			canvas: canvasElement,
			debug: false,
		});
	}
	return k;
};

export const getKaboomInstance = () => {
	if (!k) {
		throw new Error("Kaboom has not been initialized yet.");
	}
	return k;
};
