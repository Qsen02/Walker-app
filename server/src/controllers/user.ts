import { Router } from "express";
import { getUserById } from "../services/user";

const userRouter = Router();

userRouter.get("/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await getUserById(userId);
		res.json(user);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

export { userRouter };
