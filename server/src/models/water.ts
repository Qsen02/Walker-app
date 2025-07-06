import mongoose from "mongoose";

const waterSchema = new mongoose.Schema(
	{
		waterCount: {
			type: Number,
			require: true,
		},
		date: {
			type: String,
			require: true,
		},
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Users",
		},
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Water=mongoose.model("Water",waterSchema);

export {
    Water
}
