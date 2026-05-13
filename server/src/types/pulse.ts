import { Types } from "mongoose";

export interface Pulse { 
    _id: Types.ObjectId;
    value: number;
    created_at: string;
    updated: string;
}