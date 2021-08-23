import * as gute from "gute/dist"
import { io, Socket } from "socket.io-client"

class TinyWars implements gute.Game {
	socket: Socket;
	x = 100; vx = 1;
	y = 100; vy = 1;

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
		if (this.x <= 0) {
			this.x = 0;
			this.vx = 1;
		}
		if (this.x > context.getGraphics().getWidth()) {
			this.x = context.getGraphics().getWidth();
			this.vx = -1;
		}

		if (this.y <= 0) {
			this.y = 0;
			this.vy = 1;
		}
		if (this.y > context.getGraphics().getHeight()) {
			this.y = context.getGraphics().getHeight();
			this.vy = -1;
		}

		this.x = this.x + 100 * this.vx * delta / 1000;
		this.y = this.y + 100 * this.vy * delta / 1000;
	}
	render(context: gute.GameContext, g: gute.Graphics): void {
		g.fitScreen(1);
		g.fillRect(0, 0, g.getWidth(), g.getHeight(), "black");
		g.setFontSize(32);
		g.drawString(this.x, this.y, "tinywars", "ping");
	}
}

gute.startGame(new TinyWars())
