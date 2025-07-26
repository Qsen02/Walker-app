import { useEffect, useState } from "react";
import { getUserById, login, register } from "../api/userService";
import { User } from "../types/user";
import { useLoadingError } from "./useLoadingError";

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
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
				return;
			}
		})();
	},[]);

	return {
		user,
		loading,
		error,
	};
}
