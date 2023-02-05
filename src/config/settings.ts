import { AppleConfig, GeneralConfig, MapConfig, SnakeConfig } from "../interfaces/config";

const size = 24;
const step = size;
const columns = 24;
const rows = 24;

const settings = {
    map: {
        columns,
        rows,
        cellSize: size,
        strokeStyle: "rgba(0, 0, 0, 30%)",
        lineWidth: .1,
    } as MapConfig,
    snake: {
        columns,
        rows,
        cellSize: size,
        step,
        color: "chartreuse",
    } as SnakeConfig,
    apple: {
        columns,
        rows,
        cellSize: size,
        color: "yellow",
    } as AppleConfig,
} as GeneralConfig;

const mapSettings = settings.map;
const snakeSettings = settings.snake;
const appleSettings = settings.apple;

export { mapSettings, snakeSettings, appleSettings, settings };