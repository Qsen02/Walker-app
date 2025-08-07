import { format } from "date-fns";
import { Steps } from "../models/steps";
import { UserAttributes } from "../types/user";
import { Users } from "../models/users";

async function getStepsById(stepsId: string) {
	const steps = await Steps.findById(stepsId).populate("userId").lean();
	if (!steps) {
		throw new Error("Resource not found!");
	}

	return steps;
}

async function checkStepsId(stepsId: string) {
	const steps = await Steps.findById(stepsId).lean();
	if (!steps) {
		return false;
	}

	return true;
}

async function incrementSteps(
	stepsId: string,
	user: UserAttributes | null | undefined
) {
	if (!user) {
		throw new Error("Resource not found!");
	}
	const updatedSteps = await Steps.findByIdAndUpdate(
		stepsId,
		{ $inc: { stepsCount: 1 } },
		{ new: true }
	);

	if (updatedSteps && updatedSteps.stepsCount == user.purpose) {
		updatedSteps.isPurposeCompleted = true;
		updatedSteps.save();
	}

	return updatedSteps;
}

async function createSteps(user: UserAttributes | null | undefined) {
	if (!user) {
		throw new Error("No user yet!");
	}
	const steps = await Steps.create({
		userId: user._id,
		date: format(new Date(), "dd-MM-yyyy"),
	});

	await Users.findByIdAndUpdate(user._id, { $push: { activeDays: steps } });

	return steps;
}

export { checkStepsId, getStepsById, createSteps, incrementSteps };
