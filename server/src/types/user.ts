import { Step } from "./steps";
import { Water } from "./water";

export interface User{
    _id:string;
    username:string;
    email:string;
    password:string;
    activeDays:Step[];
    waterDays:Water[];
    purpose:number;
    created_at:string;
    updated_at:string;
}

export interface UserAttributes{
    _id:string;
    username:string;
    email:string;
    purpose:number;
}