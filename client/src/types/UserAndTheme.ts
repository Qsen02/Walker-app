import { UserForAuth } from "./user";

export interface UserThemeContextType {
	theme: "light" | "dark";
	changeTheme: () => void;
	userState: UserForAuth | null;
	setUser: (user: UserForAuth | null) => void;
	removeUser: () => Promise<void>;
}
