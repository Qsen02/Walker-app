import { User } from "./user";

export interface Steps {
	_id: string;
	stepsCount: number;
	date: string;
	isPurposeCompleted: boolean;
	userId: User;
	created_at: string;
	updated_at: string;
}
