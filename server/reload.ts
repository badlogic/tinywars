import { Express, Response } from "express";
import * as fs from "fs";
import * as path from "path";

var lastChangeTimestamp = 0;

export function setupAssetReload(app: Express, assetPath: string) {
	const chokidar = require('chokidar');
	chokidar.watch(assetPath).on('all', () => {
		lastChangeTimestamp = Date.now();
	});

	var reloadScript = `
	<script>
	(function(){
	var lastChangeTimestamp = null;
	setInterval(() => {
		fetch("/assetreload")
			.then(response => response.text())
			.then(timestamp => {
				if (lastChangeTimestamp == null) {
					lastChangeTimestamp = timestamp;
				} else if (lastChangeTimestamp != timestamp) {
					location.reload();
				}
			});
	}, 100);
	})();
	</script>
	`;

	let sendFile = (filename: string, res: Response<any, Record<string, any>>) => {
		fs.readFile(path.join(__dirname, "..", assetPath, filename), function (err, data) {
			if (err) {
				res.sendStatus(404);
			} else {
				res.setHeader("Content-Type", "text/html; charset=UTF-8");
				res.send(Buffer.concat([data, Buffer.from(reloadScript)]));
			}
		});
	};

	app.get("/", (req, res, next) => {
		sendFile("index.html", res);
	});

	app.get("/*.html", (req, res, next) => {
		sendFile(req.path, res);
	});

	app.get("/assetreload", (req, res) => {
		res.send(`${lastChangeTimestamp}`);
	});
}