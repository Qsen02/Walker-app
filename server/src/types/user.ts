import { Types } from "mongoose";

export interface User {
	_id: string;
	username: string;
	email: string;
	password: string;
	activeDays: Types.ObjectId[];
	waterDays: Types.ObjectId[];
	pulses: Types.ObjectId[];
	purpose: number;
	created_at: string;
	updated_at: string;
}

export interface UserAttributes{
    _id:string;
    username:string;
    email:string;
    purpose:number;
}