class Controls {
	public up: boolean;
	public down: boolean;
	public left: boolean;
	public right: boolean;

	constructor() {
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = true;
        this.addKeyboardListener();
	}

	private addKeyboardListener(): void {
		document.onkeydown = (e: KeyboardEvent): void => {
			switch (e.code) {
				case "ArrowUp":
					if (this.down) break;
					this.up = true;
					this.down = false;
					this.left = false;
					this.right = false;
					break;
				case "ArrowDown":
					if (this.up) break;
					this.up = false;
					this.down = true;
					this.left = false;
					this.right = false;
					break;
				case "ArrowLeft":
					if (this.right) break;
					this.up = false;
					this.down = false;
					this.left = true;
					this.right = false;
					break;
				case "ArrowRight":
					if (this.left) break;
					this.up = false;
					this.down = false;
					this.left = false;
					this.right = true;
					break;
				default:
					break;
			}
		};
	}
}

export default Controls;
