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
import { Pedometer } from "expo-sensors";
import { Steps } from "../types/steps";
import { Water } from "../types/water";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
	const [sessionSteps, setSessionSteps] = useState(0);
	const [displaySteps, setDisplaySteps] = useState(0);
	const sessionOffsetRef = useRef(0);
	const lastSyncedStepsRef = useRef(0);
	const [currentDay, setCurrentDay] = useState<string>("");

	useEffect(() => {
		let mounted = true;

		(async () => {
			try {
				if (!userId) return;

				setLoading(true);

				const userData = await getUserById(userId);
				if (!mounted) return;

				const lastDay = userData.activeDays[userData.activeDays.length - 1];

				const today = new Date().toDateString();

				setUser(userData);
				setBaseSteps(lastDay.stepsCount);
				setDisplaySteps(lastDay.stepsCount);
				setCurrentDay(today);

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

	useEffect(() => {
		let subscription: any;

		(async () => {
			const available = await Pedometer.isAvailableAsync();
			if (!available) return;

			subscription = Pedometer.watchStepCount((result) => {
				if (sessionOffsetRef.current === 0) {
					sessionOffsetRef.current = result.steps;
				}

				const session = result.steps - sessionOffsetRef.current;

				setSessionSteps(session);
			});
		})();

		return () => {
			subscription?.remove();
		};
	}, []);

	useEffect(() => {
		const target = baseSteps + sessionSteps;

		const interval = setInterval(() => {
			setDisplaySteps((prev) => {
				if (prev >= target) return target;
				return prev + Math.max(1, Math.ceil((target - prev) / 8));
			});
		}, 16);

		return () => clearInterval(interval);
	}, [baseSteps, sessionSteps]);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (!userId) return;

			const total = baseSteps + sessionSteps;

			if (total === lastSyncedStepsRef.current) return;

			lastSyncedStepsRef.current = total;

			await incrementSteps(user?.activeDays[user.activeDays.length - 1]._id, {
				steps: total,
			});
		}, 15000);

		return () => clearInterval(interval);
	}, [baseSteps, sessionSteps, user]);

	function resetLocalState() {
		setBaseSteps(0);
		setSessionSteps(0);
		setDisplaySteps(0);
		sessionOffsetRef.current = 0;
	}

	useEffect(() => {
		const checkNewDay = async () => {
			const today = new Date().toDateString();
			const last = await AsyncStorage.getItem("lastMidnightRequest");

			if (last && last !== today) {
				resetLocalState();
			}
		};

		const interval = setInterval(checkNewDay, 60000);

		return () => clearInterval(interval);
	}, []);

	return {
		user,
		loading,
		error,
		displaySteps,
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
