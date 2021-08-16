import * as gute from "gute/dist"
import { io, Socket } from "socket.io-client"

class TinyWars implements gute.Game {
	socket: Socket;

	init(context: gute.GameContext): void {
		/*this.socket = io({ transports: ['websocket'] });
		this.socket.on("connect", () => {
			console.log("connected");
		})
		this.socket.on("disconnect", () => {
			console.log("disconnected");
		})*/

		let ws = new WebSocket(`${location.protocol == "https" ? "wss" : "ws"}://${location.host}/ws`);
		ws.onerror = function () {
			console.log("Error ws");
		};
		ws.onopen = function () {
			console.log("Connected ws");
		};
		ws.onclose = function () {
			console.log("Closed ws");
		};
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
