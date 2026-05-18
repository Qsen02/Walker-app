import { useEffect, useRef, useState } from "react";
import {
	changePassword,
	editUser,
	getActiveDays,
	getUserById,
	getWaterDays,
	login,
	register,
} from "../api/userService";
import { User } from "../types/user";
import { useLoadingError } from "./useLoadingError";
import { incrementSteps } from "../api/stepsService";
import { Accelerometer, Pedometer } from "expo-sensors";
import { Steps } from "../types/steps";
import { Water } from "../types/water";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { detectStep, getMagnitude, resetStepProcessing, smooth } from "../utils/stepsHelper";

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
	const [user, setUser] = useState<User | null>(initialValues);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [baseSteps, setBaseSteps] = useState(0);

	useEffect(() => {
		let mounted = true;

		(async () => {
			try {
				if (!userId) return;

				setLoading(true);

				const userData = await getUserById(userId);
				if (!mounted) return;

				const lastDay =
					userData.activeDays[userData.activeDays.length - 1];

				setUser(userData);
				setBaseSteps(lastDay.stepsCount);

				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => {
			mounted = false;
		};
	}, [userId]);

	return {
		user,
		loading,
		error,
		baseSteps,
	};
}

export function useStepCounter(baseSteps = 0, curUser: User | null) {
	const [sessionSteps, setSessionSteps] = useState(0);
	const [displaySteps, setDisplaySteps] = useState(baseSteps);

	const sessionRef = useRef(0);

	const lastSyncedRef = useRef(0);

	useEffect(() => {
		Accelerometer.setUpdateInterval(100);

		const sub = Accelerometer.addListener((data) => {
			const magnitude = getMagnitude(data);
			const smoothed = smooth(magnitude);

			const isStep = detectStep(smoothed);

			if (isStep) {
				sessionRef.current += 1;
				setSessionSteps(sessionRef.current);
			}
		});

		return () => sub.remove();
	}, []);

	useEffect(() => {
		const target = baseSteps + sessionSteps;

		const interval = setInterval(() => {
			setDisplaySteps((prev) => {
				if (prev >= target) return target;
				return prev + Math.max(1, Math.ceil((target - prev) / 10));
			});
		}, 16);

		return () => clearInterval(interval);
	}, [baseSteps, sessionSteps]);

	useEffect(() => {
		const interval = setInterval(async () => {
			const total = baseSteps + sessionSteps;

			if (total === lastSyncedRef.current) return;

			lastSyncedRef.current = total;
			const stepsId = curUser?.activeDays.at(-1)?._id;

			await incrementSteps(stepsId, { steps: total });
		}, 15000);

		return () => clearInterval(interval);
	}, [baseSteps, sessionSteps]);

	function reset() {
		sessionRef.current = 0;
		setSessionSteps(0);
		setDisplaySteps(baseSteps);
		resetStepProcessing();
	}

	return {
		sessionSteps,
		displaySteps,
		reset,
	};
}

export function useGetLastSteps(initialValues: [], userId: string) {
	const [steps, setSteps] = useState<Steps[]>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false,
	);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		(async () => {
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
		})();

		return () => {
			controller.abort();
		};
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
		false,
	);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;
		(async () => {
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
		})();
		return () => {
			controller.abort();
		};
	}, []);

	return {
		waterDays,
		loading,
		error,
	};
}

export function useGetOnlyUser(initialValues: null, userId: string) {
	const [user, setUser] = useState<User | null>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false,
	);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;
		(async () => {
			try {
				setLoading(true);
				if (!signal.aborted) {
					const curUser = await getUserById(userId);
					setUser(curUser);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();
		return () => {
			controller.abort();
		};
	}, []);

	return {
		user,
		setUser,
		loading,
		error,
	};
}

export function useEditUser() {
	return async function (userId: string | undefined, data: object) {
		return await editUser(userId, data);
	};
}

export function useChangePassword() {
	return async function (userId: string, data: object) {
		return await changePassword(userId, data);
	};
}
