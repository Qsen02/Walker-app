import express from "express";
import dotenv from "dotenv";
import { expressConfig } from "./config/express";
import { runDB } from "./config/mongoose";
import { routesConfig } from "./config/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
	await runDB();

	expressConfig(app);
	routesConfig(app);

	app.listen(port,() => {
		console.log(`Server is listening on port ${port}`);
	});
}

startServer();
