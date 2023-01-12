import config from "./config";

import express from "express";

import ws from "ws";

import Logger from "./loaders/logger";

async function startServer() {
	const app = express();

	const wsServer = new ws.Server({ noServer: true });
	wsServer.on("connection", socket => {
		socket.on("message", message => {
			Logger.info(`WS: ${message}`);
		});
	});

	app.use(require("express-status-monitor")());

	await require("./loaders").default(app);

	const httpServer = app.listen(config.setup.port, () => {
		Logger.info(`>> API Server listening on port: ${config.setup.port} <<`);
	})

	httpServer.on("error", (error: any) => {
		Logger.error(error);
	});

	httpServer.on("upgrade", (req, socket, head) => {
		wsServer.handleUpgrade(req, socket, head, socket => {
			wsServer.emit("connection", socket, req);
		})
	})
};

startServer();