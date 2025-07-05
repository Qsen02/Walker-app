import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		require: true,
	},
	email: {
		type: String,
		unique: true,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	activeDays: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "Steps",
		default: [],
	},
	purpose: {
		type: Number,
		default: 6000,
	},
});

const Users = mongoose.model("Users", userSchema);

export { 
    Users 
};
