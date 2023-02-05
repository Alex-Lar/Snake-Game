interface GeneralConfig {
	map: MapConfig;
	snake: SnakeConfig;
	apple: AppleConfig;
}

interface MapConfig {
	cellSize: number;
	columns: number;
	rows: number;
	strokeStyle: string;
	lineWidth: number;
}

interface SnakeConfig {
	color: string;
	cellSize: number;
	step: number;
	columns: number;
	rows: number;
}

interface AppleConfig {
	columns: number;
	rows: number;
	cellSize: number;
	color: string;
}

export { GeneralConfig, MapConfig, SnakeConfig, AppleConfig };