import kaboom from "kaboom";

let k = null;

export const kaboomContext = (canvasElement) => {
	if (!k) {
		k = kaboom({
			global: false,
			canvas: canvasElement,
			debug: true,
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
