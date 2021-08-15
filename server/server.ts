import express from "express";
import { setupAssetReload } from "./reload";

const app = express();
const port = 3000;

if (process.env.NODE_DEV != "production") {
	setupAssetReload(app, "assets");
}

app.use(express.static("assets"));

app.get("/reload", (req, res) => {
	if (process.env.TINYWARS_RELOAD_PWD == req.query["pwd"]) {
		process.exit(0);
	}
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});