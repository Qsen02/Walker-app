import mongoose from "mongoose";

const stepsSchema = new mongoose.Schema(
	{
		stepsCount: {
			type: Number,
			require: true,
			default:0
		},
		date: {
			type: String,
			require: true,
		},
		isPurposeCompleted: {
			type: Boolean,
			default:false
		},
        userId:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Users"
        }
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Steps=mongoose.model("Steps",stepsSchema);

export {
    Steps
}
