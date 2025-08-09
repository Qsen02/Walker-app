import { UserForAuth } from "./user";

export type Theme = "light" | "dark";

export type Language = "bulgarian" | "english";

export interface UserThemeContextType {
	theme: Theme;
	changeTheme: () => void;
	language: Language;
	changeLanguage: (value: "bulgarian" | "english") => void;
	userState: UserForAuth | null;
	setUser: (user: UserForAuth | null) => void;
	removeUser: () => Promise<void>;
}
