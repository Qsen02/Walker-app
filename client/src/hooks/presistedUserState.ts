import { useState } from "react";
import { UserForAuth } from "../types/user";
import { getUserData } from "../utils/userHelper";

export function usePresistedUserState(initialValues: null) {
	const [curUser, setCurUser] = useState<UserForAuth | null>(() => {
		const isUser = getUserData();
		if (isUser) {
			return isUser;
		}
		return initialValues;
	});

	function setUserState(value: UserForAuth | null) {
		setCurUser(value);
	}

	return {
		curUser,
		setUserState,
	};
}
