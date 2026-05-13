import { PulseModel } from "../models/pulses";
import { Pulse } from "../types/pulse";

export async function getAllPulses() {
	const pulses = await PulseModel.find().lean();
	return pulses;
}

export async function getPulseById(pulseId: string) {
	try {
		const pulse = await PulseModel.findById(pulseId).lean();
		if (!pulse) {
			throw new Error("Resorce not found!");
		}
		return pulse;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Unknown error occurd!");
		}
	}
}

export async function paginatePulses(page: number) {
	const limit = 10;
	const skipCount = limit * page;
	const pulses = await PulseModel.find().skip(skipCount).limit(limit).lean();
	const documents = await PulseModel.countDocuments();
    const maxPage = Math.ceil(documents / page);
    
	return {
		pulses,
		maxPage,
	};
}

export async function createPulse(data: Pulse) { 
    const newPusle = await PulseModel.create({
        value: data.value
    });

    return newPusle;
}
