import { format } from "date-fns";
import { Steps } from "../models/steps";
import { UserAttributes } from "../types/user";

async function getStepsById(stepsId: string) {
	const steps = await Steps.findById(stepsId).lean();
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

async function incrementSteps(stepsId: string, user: UserAttributes) {
	const updatedSteps = await Steps.findByIdAndUpdate(
		stepsId,
		{ $inc: { stepsCount: 1 } },
		{ new: true }
	);

	if (updatedSteps && updatedSteps.stepsCount! == user.purpose) {
		updatedSteps.isPurposeCompleted = true;
		updatedSteps.save();
	}

	return updatedSteps;
}

async function createSteps(user: UserAttributes) {
	const steps = await Steps.create({
		userId: user._id,
		date: format(new Date(), "dd-MM-yyyy"),
	});

	return steps;
}

export { checkStepsId, getStepsById, createSteps, incrementSteps };
