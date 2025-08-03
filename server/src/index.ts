import express from "express";
import dotenv from "dotenv";
import { expressConfig } from "./config/express";
import { runDB } from "./config/mongoose";
import { routesConfig } from "./config/routes";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server=http.createServer();

async function startServer() {
	await runDB();

	expressConfig(app);
	routesConfig(app);

	app.listen(port,() => {
		console.log(`Server is listening on port ${port}`);
	});
}

startServer();
