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
		(async () => {
			try {
				setLoading(true);
				const steps = await getStepsById(stepsId);
				setCurSteps(steps);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();
	}, []);

	return {
		curSteps,
		loading,
		error,
	};
}
