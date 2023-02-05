import { appleSettings } from "../config/settings";
import { randPosition } from "../helpers/randPosition";
import { AppleConfig } from "../interfaces/config";
import { Coordinates } from "../interfaces/coordinates";

class Apple {
	private config: AppleConfig = appleSettings;
	private _size: number;
	private _isEaten = false;
	private pos: Coordinates;

	constructor(pos: Coordinates) {
		this._size = this.config.cellSize;
		this.pos = pos;
	}

	public draw(ctx: CanvasRenderingContext2D | null): void {
		if (!ctx) return;

		ctx.beginPath();

		ctx.roundRect(this.pos.x, this.pos.y, this._size, this._size, 10);
		// ctx.rect(this.pos.x, this.pos.y, this._size, this._size);

		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
		ctx.fillStyle = `${this.config.color}`;

		ctx.fill();
        ctx.stroke();
	}

	public get coordinates() {
		if (!this.pos) throw new Error("Apple has no coordinates");
		return this.pos;
	}

	public get isEaten() {
		return this._isEaten;
	}

	public set isEaten(bool: boolean) {
		this._isEaten = bool;
	}

	public set coordinates(pos: Coordinates) {
		if (!pos) return;

		this.pos = {
			x: pos.x,
			y: pos.y,
		};
	}
}

export default Apple;
