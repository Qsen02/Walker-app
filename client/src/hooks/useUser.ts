import { useEffect, useState } from "react";
import { getUserById, login, register } from "../api/userService";
import { User } from "../types/user";
import { useLoadingError } from "./useLoadingError";
import { incrementSteps } from "../api/stepsService";
import { registrateBackgoundTask } from "../utils/checkMidnight";

export function useRegister() {
	return async function (data: object) {
		return await register(data);
	};
}

export function useLogin() {
	return async function (data: object) {
		return await login(data);
	};
}

export function useGetOneUser(initialValues: null, userId: string | undefined) {
	const [user, setUser] = useState<null | User>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				if (userId) {
					const user = await getUserById(userId);
					setUser(user);
				} else {
					return;
				}
				await registrateBackgoundTask();
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();
	}, []);

	return {
		user,
		loading,
		error,
	};
}

export function useIncrementSteps(){
	return async function (stpesId:string | undefined){
		return await incrementSteps(stpesId);
	}
}
