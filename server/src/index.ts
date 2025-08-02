import express from "express";
import dotenv from "dotenv";
import { expressConfig } from "./config/express";
import { runDB } from "./config/mongoose";
import { routesConfig } from "./config/routes";
import {Server} from "socket.io";
import http from "http";
import { socketConfig } from "./config/sockets";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server=http.createServer();
const io= new Server(server);

async function startServer() {
	await runDB();

	expressConfig(app);
	routesConfig(app);
	socketConfig(io);

	app.listen(port,() => {
		console.log(`Server is listening on port ${port}`);
	});
}

startServer();
