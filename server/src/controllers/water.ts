import { Router } from "express";
import { isUser } from "../middlewares/guard";
import { createWater, getWaterById, updateWater } from "../services/water";
import { MyRequest } from "../types/express";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParser";

const waterRouter = Router();

waterRouter.get("/:waterId", isUser(), async (req, res) => {
	try {
		const waterId = req.params.waterId;
		const steps = await getWaterById(waterId);
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

waterRouter.post("/", isUser(), async (req: MyRequest, res) => {
	const user = req.user;
	try {
		const newWater = await createWater(user);
		res.json(newWater);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

waterRouter.put(
	"/:waterId",
	body("waterCount")
		.isInt({ min: 1 })
		.withMessage("Water must be at least 1ml."),
	isUser(),
	async (req, res) => {
		const waterId = req.params.waterId;
		const waterCount = Number(req.body.waterCount);
		try {
            const results=validationResult(req);
            if(!results.isEmpty()){
                throw new Error(errorParser(results));
            }
            const updatedWater=await updateWater(waterId,waterCount);
            res.json(updatedWater);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	}
);

export { waterRouter };
