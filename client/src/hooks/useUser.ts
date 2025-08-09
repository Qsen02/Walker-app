import { useEffect, useRef, useState } from "react";
import {
	getActiveDays,
	getUserById,
	getWaterDays,
	login,
	register,
} from "../api/userService";
import { User } from "../types/user";
import { useLoadingError } from "./useLoadingError";
import { incrementSteps } from "../api/stepsService";
import { registrateBackgoundTask } from "../utils/checkMidnight";
import { Accelerometer } from "expo-sensors";
import { Steps } from "../types/steps";
import { Water } from "../types/water";

interface AccelerometerProps {
	x: number;
	y: number;
	z: number;
}

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
	const [steps, setSteps] = useState(0);
	const userRef = useRef<null | User>(initialValues);

	useEffect(() => {
		if (user) {
			userRef.current = user;
		}
	}, [user]);

	async function checkMovement({ x, y, z }: AccelerometerProps) {
		const rawAccel = Math.sqrt(x * x + y * y + z * z);
		const gravity = 1.0;
		const netAccel = Math.abs(rawAccel - gravity);
		if (netAccel > 0.2 && netAccel < 2.0) {
			await incrementSteps(
				userRef.current?.activeDays[
					userRef.current?.activeDays.length - 1
				]._id
			);
			setSteps((value: number) => value + 1);
		}
	}

	useEffect(() => {
		(async () => {
			const controller = new AbortController();
			const { signal } = controller;
			const subscription = Accelerometer.addListener(checkMovement);
			try {
				setLoading(true);
				if (!signal.aborted) {
					if (userId) {
						const user = await getUserById(userId);
						setUser(user);
						setSteps(
							user.activeDays[user.activeDays.length - 1]
								.stepsCount
						);
					} else {
						return;
					}
					await registrateBackgoundTask(setSteps);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
			return () => {
				subscription.remove();
				controller.abort();
			};
		})();
	}, []);

	return {
		user,
		loading,
		error,
		steps,
	};
}

export function useGetLastSteps(initialValues: [], userId: string) {
	const [steps, setSteps] = useState<Steps[]>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			const controller = new AbortController();
			const { signal } = controller;
			try {
				setLoading(true);
				if (!signal.aborted) {
					const curSteps = await getActiveDays(userId);
					setSteps(curSteps);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
			return () => {
				controller.abort();
			};
		})();
	}, []);

	return {
		steps,
		loading,
		error,
	};
}

export function useGetLastWater(initialValues: [], userId: string) {
	const [waterDays, setWaterDays] = useState<Water[]>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			const controller = new AbortController();
			const { signal } = controller;
			try {
				setLoading(true);
				if (!signal.aborted) {
					const curWaterDays = await getWaterDays(userId);
					setWaterDays(curWaterDays);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
			return () => {
				controller.abort();
			};
		})();
	}, []);

	return {
		waterDays,
		loading,
		error,
	};
}
