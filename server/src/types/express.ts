import { Request } from "express";
import { UserAttributes } from "./user";

export interface MyRequest extends Request {
	user?: UserAttributes | null;
}
