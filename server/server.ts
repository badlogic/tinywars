import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import { setupAssetReload } from "./reload";

const port = 3000;
const app = express()
const server = createServer(app);
const io = new Server(server);

// Setup express
if (process.env.NODE_DEV != "production") {
	setupAssetReload(app, "assets");
}
app.use(express.static("assets"));

app.get("/reload", (req, res) => {
	if (process.env.TINYWARS_RELOAD_PWD == req.query["pwd"]) {
		res.sendStatus(200);
		setTimeout(() => process.exit(0), 1000);
	}
});

// Setup socket.io
io.on("connection", (socket: Socket) => {
	console.log("Connected socket");
});

// Run server
server.on("listening", () => {
	console.log(`Listening in port ${port}`);
})
server.listen(port);