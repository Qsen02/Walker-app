import { Express } from "express";
import { userRouter } from "../controllers/user";
import { stepsRouter } from "../controllers/steps";
import { waterRouter } from "../controllers/water";
import { isUser } from "../middlewares/guard";
import { pulseRouter } from "../controllers/pulses";

function routesConfig(app: Express) {
	app.use("/users", userRouter);

	app.use("/steps", isUser(), stepsRouter);

	app.use("/water", isUser(), waterRouter);

	app.use("/pulse", isUser(), pulseRouter);

	app.use((req, res) => {
		res.status(404).json({ message: "Resource not found!" });
	});
}

export { routesConfig };
