import {NextFunction, Response } from "express";
import { MyRequest } from "../types/express";
import { verifyToken } from "../services/token";

function session(){
    return function (req:MyRequest,res:Response,next:NextFunction){
        const token=req.headers["x-authorization"];

        if(token && typeof token === "string"){
            try{
                const payload=verifyToken(token);
                req.user=payload;
            }catch(err){
                res.status(403).json({message:"You don't have credentials! Please login or register!"});
                return;
            }
        }
        next();
    }
}

export {
    session
}