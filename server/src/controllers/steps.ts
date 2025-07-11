import { Router } from "express";
import { isUser } from "../middlewares/guard";
import {
	checkStepsId,
	createSteps,
	getStepsById,
	incrementSteps,
} from "../services/steps";
import { MyRequest } from "../types/express";

const stepsRouter = Router();

stepsRouter.get("/:stepsId", isUser(), async (req, res) => {
	try {
		const stepsId = req.params.stepsId;
		const steps = await getStepsById(stepsId);
		res.json(steps);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

stepsRouter.post("/", isUser(), async (req: MyRequest, res) => {
	const user = req.user;
	try {
		const newSteps = await createSteps(user);
		res.json(newSteps);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

stepsRouter.put("/:stepsId", isUser(), async (req: MyRequest, res) => {
	const user = req.user;
	const stepsId = req.params.stepsId;
	const isValid = await checkStepsId(stepsId);
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	try {
		const updatedSteps = await incrementSteps(stepsId, user);
		res.json(updatedSteps);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

export { stepsRouter };
