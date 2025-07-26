import { useEffect, useState } from "react";
import { getUserById, login, register } from "../api/userService";
import { User } from "../types/user";
import { useLoadingError } from "./useLoadingError";
import { createSteps } from "../api/stepsService";

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

	async function checkHour() {
		const now = new Date();
		const hour = now.getHours();
		const minutes=now.getMinutes();
		if(hour===0 && minutes===0){
			await createSteps();
		}
	}

	useEffect(() => {
		(async () => {
			const checkHourInterval=setInterval(checkHour,10000);
			try {
				setLoading(true);
				if (userId) {
					const user = await getUserById(userId);
					setUser(user);
				} else {
					return;
				}
				setLoading(false);
				return ()=> clearInterval(checkHourInterval);
			} catch (err) {
				setLoading(false);
				setError(true);
				return ()=> clearInterval(checkHourInterval);
			}
		})();
	}, []);

	return {
		user,
		loading,
		error,
	};
}
