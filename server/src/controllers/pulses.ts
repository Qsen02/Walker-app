import { Router } from "express";
import {
	createPulse,
	getAllPulses,
	getPulseById,
	paginatePulses,
} from "../services/pulses";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParser";
import { checkUserId } from "../services/user";

const pulseRouter = Router();

pulseRouter.get("/", async (req, res) => {
	try {
		const pulses = await getAllPulses();
		res.json(pulses);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

pulseRouter.get("/page", async (req, res) => {
	try {
		const page = Number(req.query.page);
		const pulses = await paginatePulses(page);
		res.json(pulses);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

pulseRouter.get("/:pulseId", async (req, res) => {
	try {
		const pulseId = req.params.pulseId;
		const pulse = await getPulseById(pulseId);
		res.json(pulse);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

pulseRouter.post(
	"/in/:userId",
	body("value")
		.isInt({ min: 0 })
		.withMessage("Стойността на пулса трябва да е цяло положително число!"),
	async (req, res) => {
		try {
			const userId = req?.params?.userId;
			const isValid = await checkUserId(userId);
			if (!isValid) {
				res.status(404).json({ message: "Resource not found!" });
				return;
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const fields = req.body;
			const newPulse = await createPulse(userId, fields);
			res.json(newPulse);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

export { pulseRouter };
