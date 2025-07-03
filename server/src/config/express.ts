import express,{Express} from "express";

function expressConfig(app:Express){
    app.use(express.json());
}

export {
    expressConfig
}