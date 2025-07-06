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

	const token = jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: "3d",
	});

	return token;
}

function verifyToken(token: string) {
	const isValid = jwt.verify(token, process.env.JWT_SECRET!);

	return isValid;
}

export { setToken, verifyToken };
