import BaseMap from "../entities/Map";
import Snake from "../entities/Snake";
import Apple from "../entities/Apple";

const createCanvas = (wrapperId: string): HTMLCanvasElement | null => {
	const canvas = document.createElement("canvas");
	const container = document.getElementById(`${wrapperId}`);

	if (container) {
		container.append(canvas);
		return canvas;
	}

	return null;
};

const gameSetup = (canvas: HTMLCanvasElement | null) => {
	if (!canvas) return;
	const ctx = canvas.getContext("2d");

	const map = new BaseMap();
	const snake = new Snake();

	let position = map.genUnusedPosition(snake.coordinates);
	const apple = new Apple(position);

	map.setSize(ctx);
	map.setGrid(ctx);
	snake.draw(ctx);
	apple.draw(ctx);

	const animate = (): void => {
		setTimeout(function onTick() {
			map.clear(ctx);
			map.setGrid(ctx);

			snake.update(ctx);
			snake.appleCollisionDetection(apple.coordinates);

			if (snake.hasEatenApple) {
				position = map.genUnusedPosition(snake.coordinates);
				apple.coordinates = position;
				snake.grow();
				snake.hasEatenApple = false;
			}

			snake.draw(ctx);
			apple.draw(ctx);

			requestAnimationFrame(animate);
		}, 80);
	};
	animate();
};

const canvas = createCanvas("canvas-container");
gameSetup(canvas);
