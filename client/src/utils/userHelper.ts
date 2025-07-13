import * as ExpoStore from "expo-secure-store";
import { UserForAuth } from "../types/user";

export function getUserData() {
	try {
		const data = ExpoStore.getItem("user");
		if (data) {
			return JSON.parse(data) as UserForAuth;
		}
		return null;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Error occurd!");
		}
	}
}

export function setUserData(data: UserForAuth) {
	try {
		ExpoStore.setItem("user", JSON.stringify(data));
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Error occurd!");
		}
	}
}

export async function removeData(key: string) {
	try {
		ExpoStore.deleteItemAsync(key);
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Error occurd!");
		}
	}
}
