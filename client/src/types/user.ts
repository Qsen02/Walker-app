import { Steps } from "./steps";
import { Water } from "./water";

export interface User {
	_id: string;
	username: string;
	email: string;
	password: string;
	purpose: number;
	activeDays: Steps[];
	waterDays: Water[];
	created_at: string;
	updated_at: string;
}

export interface UserForAuth {
	_id: string;
	username: string;
	email: string;
	purpose: number;
	accessToken:string;
}
