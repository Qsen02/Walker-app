import mongoose from "mongoose";

async function runDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Walker-App");
    console.log("Database is running...");
}

export {
    runDB
}