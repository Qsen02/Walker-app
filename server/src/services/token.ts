import { UserAttributes } from "../types/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function setToken(user: UserAttributes) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
		purpose: user.purpose,
	};

	if (process.env.JWT_SECRET) {
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "3d",
		});

		return token;
	} else {
		return null;
	}
}

function verifyToken(token: string) {
	if (process.env.JWT_SECRET) {
		const isValid = jwt.verify(
			token,
			process.env.JWT_SECRET
		) as UserAttributes;

		return isValid;
	} else {
		return null;
	}
}

export { setToken, verifyToken };
