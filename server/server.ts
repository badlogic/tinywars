import express from "express";
import { setupAssetReload } from "./reload";

const app = express();
const port = 3000;

if (process.env.NODE_DEV !== "production") {
	setupAssetReload(app, "public");
}

app.use(express.static("public"));

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});