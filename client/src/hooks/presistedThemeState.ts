import { useState } from "react";
import { getThemeData, setThemeData } from "../utils/userHelper";

export function usePresistedThemeState(initialValues: "light") {
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		const theme = getThemeData();
		if (theme) {
			return theme;
		}
		return initialValues;
	});

	function changeTheme() {
		if (theme == "light") {
			setTheme("dark");
            setThemeData("dark");
		} else {
			setTheme("light");
            setThemeData("light");
		}
	}

    return {
        theme,changeTheme
    }
}
