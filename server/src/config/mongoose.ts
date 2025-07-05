import mongoose from "mongoose";
import { Users } from "../models/users";

async function runDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Walker-App");
    await Users;
    console.log("Database is running...");
}

export {
    runDB
}