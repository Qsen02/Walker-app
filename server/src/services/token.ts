import { UserAttributes } from "../types/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Document, Types } from "mongoose";
dotenv.config();

function setToken(
	user: Document<
		unknown,
		{},
		{
			activeDays: Types.ObjectId[];
			waterDays: Types.ObjectId[];
			purpose: number;
			username?: string | null | undefined;
			email?: string | null | undefined;
			password?: string | null | undefined;
		}
	> & {
		activeDays: Types.ObjectId[];
		waterDays: Types.ObjectId[];
		purpose: number;
		username?: string | null | undefined;
		email?: string | null | undefined;
		password?: string | null | undefined;
	} | undefined
) {
	const payload = {
		_id: user?._id,
		username: user?.username,
		email: user?.email,
		purpose: user?.purpose,
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
