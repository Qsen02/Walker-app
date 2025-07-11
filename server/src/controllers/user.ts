import { Router } from "express";
import {
	checkUserId,
	editPassword,
	editUser,
	getUserActiveDays,
	getUserById,
	getUserWaterDays,
	login,
	register,
} from "../services/user";
import { isUser } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParser";
import { setToken } from "../services/token";
import { MyRequest } from "../types/express";

const userRouter = Router();

userRouter.get("/logout", isUser(), (req, res) => {
	res.status(200).json({ message: "Logout was successfull!" });
});

userRouter.get("/:userId", isUser(), async (req, res) => {
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

userRouter.get("/:userId/active-days", isUser(), async (req, res) => {
	try {
		const userId = req.params.userId;
		const activeDays = await getUserActiveDays(userId);
		res.json(activeDays);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

userRouter.get("/:userId/water-days", isUser(), async (req, res) => {
	try {
		const userId = req.params.userId;
		const waterDays = await getUserWaterDays(userId);
		res.json(waterDays);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

userRouter.post(
	"/register",
	body("username")
		.trim()
		.isLength({ min: 2 })
		.withMessage("Username must be at least 2 letters long!"),
	body("email").trim().isEmail().withMessage("Email must be valid email!"),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage(
			"Password must be at least 6 symbols ant must contain digits, letters and at least one capital letter and special symbol!"
		),
	body("repass")
		.trim()
		.custom((value: string, { req }) => req.body.password === value)
		.withMessage("Repeat password must match!"),
	async (req, res) => {
		const fields = req.body;
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const user = await register(
				fields.username,
				fields.password,
				fields.email
			);
			const token = setToken(user);
			res.json({
				username: user.username,
				email: user.email,
				purpose: user.purpose,
				accessToken: token,
			});
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

userRouter.post(
	"/login",
	body("username")
		.trim()
		.isLength({ min: 2 })
		.withMessage("Username or password don't match!"),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage("Username or password don't match!"),
	async (req, res) => {
		const fields = req.body;
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const user = await login(fields.username, fields.password);
			const token = setToken(user);
			res.json({
				username: user?.username,
				email: user?.email,
				purpose: user?.purpose,
				accessToken: token,
			});
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

userRouter.put(
	"/:userId/edit",
	isUser(),
	body("username")
		.trim()
		.isLength({ min: 2 })
		.withMessage("Username must be at least 2 letters long!"),
	body("email").trim().isEmail().withMessage("Email must be valid email!"),
	body("purpose")
		.isInt({ min: 1000 })
		.withMessage("Purpose must be minimum 1000 steps!"),
	async (req: MyRequest, res) => {
		const fields = req.body;
		const userId = req.params.userId;
		const isValid = await checkUserId(userId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedUser = await editUser(
				userId,
				fields.username,
				fields.email,
				fields.purpose
			);
			res.json(updatedUser);
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

userRouter.put(
	"/:userId/change-password",
	isUser(),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage(
			"Password must be at least 6 symbols ant must contain digits, letters and at least one capital letter and special symbol!"
		),
	async (req: MyRequest, res) => {
		const fields = req.body;
		const userId = req.params.userId;
		const isValid = await checkUserId(userId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedUser = await editPassword(userId, fields.password);
			res.json(updatedUser);
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

export { userRouter };
