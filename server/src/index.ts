import express from "express";
import dotenv from "dotenv";
import { expressConfig } from "./config/express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

async function startServer(){
    expressConfig(app);

    app.listen(()=>{
        console.log(`Server is listening on port ${port}`);
    })
}

startServer();
