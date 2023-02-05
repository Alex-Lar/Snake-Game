import { snakeSettings } from "../config/settings";
import { randPosition } from "../helpers/randPosition";
import { SnakeConfig } from "../interfaces/config";
import { Coordinates } from "../interfaces/coordinates";
import Controls from "./Controls";

class Snake {
	private config: SnakeConfig = snakeSettings;
	private pos: Coordinates[];
	private controls: Controls;
	private _hasEatenApple = false;

	constructor() {
		this.controls = new Controls();

		let x = randPosition(this.config.step, this.config.columns);
		let y = randPosition(this.config.step, this.config.rows);

		this.pos = [{ x, y }];
	}

	public draw(ctx: CanvasRenderingContext2D | null): void {
		if (!ctx) return;
		const { cellSize } = this.config;

		for (let pos of this.pos) {
			ctx.beginPath();
			ctx.roundRect(pos.x, pos.y, cellSize, cellSize, 4);
			// ctx.rect(pos.x, pos.y, cellSize, cellSize);
			ctx.fillStyle = `${this.config.color}`;
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.fill();
			ctx.stroke();
		}
	}

	public grow(): void {
		let lastPart = this.pos[this.pos.length - 1];

		this.pos.push({
			x: lastPart.x,
			y: lastPart.y,
		});
	}

	public update(ctx: CanvasRenderingContext2D | null): void {
		this.move();
		this.sideCollisionDetection(ctx!.canvas.width, ctx!.canvas.height);
	}

	public appleCollisionDetection(pos: Coordinates): void {
		const head = this.headCoordinates;

		if (head.x === pos.x && head.y === pos.y) {
			this._hasEatenApple = true;
		}
	}

	private sideCollisionDetection(width: number, height: number): void {
		let head = this.headCoordinates;

		if (head.x >= width) {
			let newHead = {
				x: 0,
				y: head.y,
			};

			this.pos.unshift(newHead);
			this.pos.pop();
		}

		if (head.x < 0) {
			let newHead = {
				x: this.config.step * this.config.columns - this.config.step,
				y: head.y,
			};

			this.pos.unshift(newHead);
			this.pos.pop();
		}

		if (head.y >= height) {
			let newHead = {
				x: head.x,
				y: 0,
			};

			this.pos.unshift(newHead);
			this.pos.pop();
		}

		if (head.y < 0) {
			let newHead = {
				x: head.x,
				y: this.config.step * this.config.rows - this.config.step,
			};

			this.pos.unshift(newHead);
			this.pos.pop();
		}
	}

	private move(): void {
		if (this.controls.up) {
			this.moveUp();
		}
		if (this.controls.down) {
			this.moveDown();
		}
		if (this.controls.left) {
			this.moveLeft();
		}
		if (this.controls.right) {
			this.moveRight();
		}
	}

	private moveRight(): void {
		let head = this.headCoordinates;

		let newHead = {
			x: head.x + this.config.step,
			y: head.y,
		};

		this.pos.unshift(newHead);
		this.pos.pop();
	}

	private moveLeft(): void {
		let head = this.headCoordinates;

		let newHead = {
			x: head.x - this.config.step,
			y: head.y,
		};

		this.pos.unshift(newHead);
		this.pos.pop();
	}

	private moveUp(): void {
		let head = this.headCoordinates;

		let newHead = {
			x: head.x,
			y: head.y - this.config.step,
		};

		this.pos.unshift(newHead);
		this.pos.pop();
	}

	private moveDown(): void {
		let head = this.headCoordinates;

		let newHead = {
			x: head.x,
			y: head.y + this.config.step,
		};

		this.pos.unshift(newHead);
		this.pos.pop();
	}

	public get hasEatenApple() {
		return this._hasEatenApple;
	}

	public get coordinates() {
		return this.pos;
	}

	public get headCoordinates() {
		return {
			x: this.pos[0].x,
			y: this.pos[0].y,
		} as Coordinates;
	}

	public set hasEatenApple(bool: boolean) {
		this._hasEatenApple = bool;
	}

	public set headCoordinates(coordinates: Coordinates) {
		const { x, y } = coordinates;

		this.pos[0].x = x;
		this.pos[0].y = y;
	}
}

export default Snake;
