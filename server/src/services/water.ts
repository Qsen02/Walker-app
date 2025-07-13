import { format } from "date-fns";
import { Water } from "../models/water";
import { UserAttributes } from "../types/user";
import { Users } from "../models/users";

async function getWaterById(waterId: string) {
	const water = await Water.findById(waterId).populate("userId").lean();
	if (!water) {
		throw new Error("Resource not found!");
	}

	return water;
}

async function checkWaterId(waterId: string) {
	const water = await Water.findById(waterId).lean();
	if (!water) {
		return false;
	}

	return true;
}

async function createWater(user: UserAttributes | null | undefined) {
	if (!user) {
		throw new Error("Resource not found!");
	}
	const newWater = await Water.create({
		userId: user._id,
		date: format(new Date(), "dd-MM-yyyy"),
	});

	await Users.findByIdAndUpdate(user._id, { $push: { waterDays: newWater } });

	return newWater;
}

async function updateWater(waterId: string, newWaterCount: number) {
	const updatedWater = await Water.findByIdAndUpdate(
		waterId,
		{ $inc: { waterCount: newWaterCount } },
		{ new: true }
	).lean();

	return updatedWater;
}

export { getWaterById, checkWaterId, createWater, updateWater };
