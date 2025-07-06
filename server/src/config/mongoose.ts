import mongoose from "mongoose";
import { Users } from "../models/users";
import { Steps } from "../models/steps";
import { Water } from "../models/water";

async function runDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Walker-App");
    await Users;
    await Steps;
    await Water;
    console.log("Database is running...");
}

export {
    runDB
}