import * as gute from "gute/dist"


class TinyWars implements gute.Game {
	init(context: gute.GameContext): void {
		console.log("initialized");
	}
	onMouseDown(context: gute.GameContext, x: number, y: number): void {
	}
	onMouseUp(context: gute.GameContext, x: number, y: number): void {
	}
	onMouseMove(context: gute.GameContext, x: number, y: number): void {
	}
	onKeyDown(context: gute.GameContext, key: string): void {
	}
	onKeyUp(context: gute.GameContext, key: string): void {
	}
	update(context: gute.GameContext, delta: number): void {
	}
	render(context: gute.GameContext, g: gute.Graphics): void {
		g.fillRect(0, 0, 320, 240, "blue");
		g.drawLine(0, 0, 320, 240, "green");
	}

}

gute.startGame(new TinyWars())
