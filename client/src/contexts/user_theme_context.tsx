import { createContext, ReactNode, useContext } from "react";
import { UserThemeContextType } from "../types/UserAndTheme";
import { usePresistedUserState } from "../hooks/presistedUserState";
import { usePresistedThemeState } from "../hooks/presistedThemeState";
import { UserForAuth } from "../types/user";
import { removeData, setUserData } from "../utils/userHelper";
import { logout } from "../api/userService";
import { usePresistedLanguageState } from "../hooks/presistedLanguageState";

const UserThemeContext = createContext<UserThemeContextType | null>(null);

export default function UserThemeContextProvider(props: {
	children: ReactNode;
}) {
	const { curUser, setUserState } = usePresistedUserState(null);
	const { theme, changeTheme } = usePresistedThemeState("light");
	const {language,changeLanguage}=usePresistedLanguageState("english");

	function changeCurTheme() {
		changeTheme();
	}

	function changeCurLanguage(){
		changeLanguage();
	}

	function setUser(user: UserForAuth | null) {
		setUserState(user);
		setUserData(user);
	}

	async function removeUser() {
		setUserState(null);
		removeData("user");
		await logout();
	}

	return (
		<UserThemeContext.Provider
			value={{
				theme: theme,
				changeTheme: changeCurTheme,
				language,
				changeLanguage:changeCurLanguage,
				userState: curUser,
				setUser: setUser,
				removeUser: removeUser,
			}}
		>
			{props.children}
		</UserThemeContext.Provider>
	);
}

export function useUserThemeContext() {
	const context = useContext(UserThemeContext);

	return {
		theme: context?.theme,
		changeTheme: context?.changeTheme,
		language:context?.language,
		changeLanguage:context?.changeLanguage,
		userState:context?.userState,
		setUser:context?.setUser,
		removeUser:context?.removeUser,
	};
}
