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
    waterDays:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Water",
        default:[],
    },
	purpose: {
		type: Number,
		default: 6000,
	},
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

const Users = mongoose.model("Users", userSchema);

export { 
    Users 
};
