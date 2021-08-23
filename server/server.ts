import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import { setupLiveEdit } from "./liveedit";

const port = 3000;
const restartPassword = process.env.TINYWARS_RESTART_PWD || "1234";
const app = express()
const server = createServer(app);

// Setup live edit of anything in assets/
// when we are not in production mode.
if (process.env.NODE_DEV != "production") {
	setupLiveEdit(app, "assets");
}

// Setup express
app.use(express.static("assets"));
app.get("/restart", (req, res) => {
	if (restartPassword === req.query["pwd"]) {
		res.sendStatus(200);
		setTimeout(() => process.exit(0), 1000);
	} else res.sendStatus(400);
});

// Setup socket.io
const io = new Server(server, { path: "/ws" });
io.on("connection", (socket: Socket) => {
	console.log("Client connected");
	socket.on("disconnect", (reason: string) => console.log("Client disconnected"));
});

// Run server
server.on("listening", () => console.log(`YOLO on port ${port}`));
server.listen(port);