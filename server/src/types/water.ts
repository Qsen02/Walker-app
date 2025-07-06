import { User } from "./user";

export interface Water{
    _id:string;
    waterCount:number;
    date:string;
    userId:User;
    created_at:string;
    updated_at:string;
}