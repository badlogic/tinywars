import * as gute from "gute/dist"
import { io, Socket } from "socket.io-client"

class TinyWars implements gute.Game {
	socket: Socket;

	init(context: gute.GameContext): void {
		this.socket = io({ path: "/ws", transports: ['websocket'] });
		this.socket.on("connect", () => {
			console.log("Connected");
		});
		this.socket.on("disconnect", () => {
			console.log("Disconnected");
		});
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
		g.fitScreen(1);
		g.fillRect(0, 0, g.getWidth(), g.getHeight(), "black");
		g.setFontSize(32);
		g.drawString(g.getWidth() / 2 - g.getStringWidth("tinywars") / 2, g.getHeight() / 2 - 32 / 2, "tinywars", "white");
	}
}

gute.startGame(new TinyWars())
