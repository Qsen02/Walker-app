import { UserForAuth } from "./user";

export interface UserThemeContextType {
	theme: "light" | "dark";
	changeTheme: () => void;
	language: "bulgarian" | "english";
	changeLanguage: (value: "bulgarian" | "english") => void;
	userState: UserForAuth | null;
	setUser: (user: UserForAuth | null) => void;
	removeUser: () => Promise<void>;
}
