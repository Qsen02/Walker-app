import { NextFunction, Request, Response } from "express";

function isUser(){
    return function (req:Request,res:Response,next:NextFunction){
        if(req.headers["x-authorization"]){
            res.status(401).json({message:"You don't have credentials!"});
            return;
        }
        next();
    }
}

export {
    isUser
}