import { Router } from "express";
import {
	checkStepsId,
	createSteps,
	getStepsById,
	incrementSteps,
} from "../services/steps";
import { MyRequest } from "../types/express";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParser";

const stepsRouter = Router();

stepsRouter.get("/:stepsId", async (req, res) => {
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

stepsRouter.post("/", async (req: MyRequest, res) => {
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

stepsRouter.put(
	"/:stepsId",
	body("steps")
		.isInt({ min: 0 })
		.withMessage("Стъпките трябва да бъдат цяло положително число!"),
	async (req: MyRequest, res) => {
		const user = req.user;
		const stepsId = req.params.stepsId;
		const isValid = await checkStepsId(stepsId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const fields = req.body;
			const updatedSteps = await incrementSteps(
				stepsId,
				user,
				fields.steps,
			);
			res.json(updatedSteps);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	},
);

export { stepsRouter };
