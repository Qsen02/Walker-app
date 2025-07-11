import { Express } from "express";
import { userRouter } from "../controllers/user";
import { stepsRouter } from "../controllers/steps";
import { waterRouter } from "../controllers/water";

function routesConfig(app: Express) {
	app.use("/users", userRouter);

	app.use("/steps", stepsRouter);

	app.use("/water",waterRouter);

	app.use((req, res) => {
		res.status(404).json({ message: "Resource not found!" });
	});
}

export { routesConfig };
