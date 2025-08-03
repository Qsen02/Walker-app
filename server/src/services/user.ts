import { Users } from "../models/users";
import bcrypt from "bcrypt";

async function register(username: string, password: string, email: string) {
	const isUsernameExist = await Users.findOne({ username: username }).lean();
	if (isUsernameExist) {
		throw new Error("User with this username already exist!");
	}
	const isEmailExist = await Users.findOne({ email: email }).lean();
	if (isEmailExist) {
		throw new Error("User with this email already exist!");
	}

	const user = await Users.create({
		username: username,
		password: await bcrypt.hash(password, 10),
		email: email,
	});

	return user;
}

async function login(username: string, password: string) {
	const isValidUsername = await Users.findOne({ username: username });
	if (!isValidUsername) {
		throw new Error("Username or password don't match!");
	}
	if (!isValidUsername?.password) {
		return;
	}
	const isValidPassword = await bcrypt.compare(
		password,
		isValidUsername.password
	);
	if (!isValidPassword) {
		throw new Error("Username or password don't match!");
	}

	return isValidUsername;
}

async function getUserById(userId: string) {
	const user = await Users.findById(userId)
		.populate("activeDays")
		.populate("waterDays")
		.lean();
	if (!user) {
		throw new Error("Resource not found!");
	}

	return user;
}

async function checkUserId(userId: string) {
	const user = await Users.findById(userId).lean();
	if (!user) {
		return false;
	}

	return true;
}

async function editUser(
	userId: string,
	newUsername: string,
	newEmail: string,
	newPurpose: number | undefined
) {
	const updatedUser = await Users.findByIdAndUpdate(
		userId,
		{
			$set: {
				username: newUsername,
				email: newEmail,
				purpose: newPurpose,
			},
		},
		{ new: true }
	).lean();

	return updatedUser;
}

async function editPassword(userId: string, newPassword: string) {
	const user = await Users.findById(userId).lean();
	if (!user?.password) {
		return;
	}
	const isOldPassword = await bcrypt.compare(newPassword, user?.password);
	if (isOldPassword) {
		throw new Error("Old password can't be the new password!");
	}
	const updatedUser = await Users.findByIdAndUpdate(
		userId,
		{
			$set: {
				password: await bcrypt.hash(newPassword, 10),
			},
		},
		{ new: true }
	).lean();

	return updatedUser;
}

async function getUserActiveDays(userId: string) {
	const user = await Users.findById(userId).populate("activeDays").lean();
	if (!user) {
		throw new Error("Resource not found!");
	}

	if (user.activeDays.length > 7) {
		return user.activeDays.slice(
			user.activeDays.length - 8,
			user.activeDays.length - 1
		);
	}

	return user.activeDays;
}

async function getUserWaterDays(userId: string) {
	const user = await Users.findById(userId).populate("waterDays").lean();
	if (!user) {
		throw new Error("Resource not found!");
	}

	if (user.waterDays.length > 7) {
		return user.waterDays.slice(
			user.waterDays.length - 8,
			user.waterDays.length - 1
		);
	}

	return user.waterDays;
}

export {
	register,
	login,
	getUserById,
	checkUserId,
	editUser,
	editPassword,
	getUserActiveDays,
	getUserWaterDays,
};
