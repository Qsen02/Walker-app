import { useEffect, useState } from "react";
import { Steps } from "../types/steps";
import { useLoadingError } from "./useLoadingError";
import { getStepsById } from "../api/stepsService";

export function useGetOneSteps(
	initialValues: null,
	stepsId: string | undefined
) {
	const [curSteps, setCurSteps] = useState<Steps | null>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;
		(async () => {
			try {
				setLoading(true);
				if (!signal.aborted) {
					const steps = await getStepsById(stepsId);
					setCurSteps(steps);
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
		curSteps,
		loading,
		error,
	};
}
