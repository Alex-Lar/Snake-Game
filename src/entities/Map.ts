import { mapSettings } from "../config/settings";
import { randPosition } from "../helpers/randPosition";
import { MapConfig } from "../interfaces/config";
import { Coordinates } from "../interfaces/coordinates";

class BaseMap {
	private config: MapConfig = mapSettings;
	private _width: number;
	private _height: number;

	constructor() {
		if (!this.config) throw new Error("Config is undefined!");

		this._width = this.calcWidth();
		this._height = this.calcHeight();
	}

	public genUnusedPosition(positions: Coordinates[]): Coordinates {
		let x = randPosition(this.config.cellSize, this.config.columns);
		let y = randPosition(this.config.cellSize, this.config.rows);

		for (let pos of positions) {
			if (pos.x === x && pos.y === y) {
				return this.genUnusedPosition(positions);
			}
		}

		return { x, y };
	}

	public setSize(ctx: CanvasRenderingContext2D | null, w?: number, h?: number): void {
		if (!ctx) return;

		ctx.canvas.width = w || this._width;
		ctx.canvas.height = h || this._height;

        if (w || h) {
            this.width = w || this._width;
            this.height = h || this._height;
        }
	}
    
    public setGrid(ctx: CanvasRenderingContext2D | null): void {
        if (!ctx) return;

        this.drawVerticalLines(ctx);
        this.drawHorizontalLines(ctx);
    }

	public clear(ctx: CanvasRenderingContext2D | null): void {
		if (!ctx) return;
		ctx.clearRect(0, 0, this._width, this._height);
	}

	private drawVerticalLines(ctx: CanvasRenderingContext2D): void {
        let step = this.config.cellSize;

		ctx.beginPath();
		for (let x = 0; x <= this._width; x += step) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, this._height);
		}
		ctx.strokeStyle = `${this.config.strokeStyle}`;
		ctx.lineWidth = this.config.lineWidth;
		ctx.stroke();
	}

    private drawHorizontalLines(ctx: CanvasRenderingContext2D): void {
        let step = this.config.cellSize;

		ctx.beginPath();
		for (let y = 0; y <= this._height; y += step) {
			ctx.moveTo(0, y);
			ctx.lineTo(this._width, y);
		}
		ctx.strokeStyle = `${this.config.strokeStyle}`;
		ctx.lineWidth = this.config.lineWidth;
		ctx.stroke();
    }

	private calcWidth = (): number => this.config.columns * this.config.cellSize;
	private calcHeight = (): number => this.config.rows * this.config.cellSize;

	public get width(): number {
		if (!this._width) return 0;

		return this._width;
	}

	public set width(w: number) {
		this._width = w;
	}

	public get height(): number {
		if (!this._width) return 0;

		return this._height;
	}

	public set height(h: number) {
		this._height = h;
	}
}

export default BaseMap;
