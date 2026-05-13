import mongoose from "mongoose";
import { Pulse } from "../types/pulse";

const pulseSchema = new mongoose.Schema<Pulse>(
	{
		value: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

const PulseModel = mongoose.model("Pulses", pulseSchema);

export { 
    PulseModel
}