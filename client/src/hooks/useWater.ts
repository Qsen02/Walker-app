import { useEffect, useState } from "react";
import { Water } from "../types/water";
import { useLoadingError } from "./useLoadingError";
import { addWater, getWaterById } from "../api/waterService";

export function useGetOneWater(
	initialValues: null,
	waterId: string | undefined
) {
	const [water, setWater] = useState<Water | null>(initialValues);
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
					const curWater = await getWaterById(waterId);
					setWater(curWater);
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
		water,
		setWater,
		loading,
		error,
	};
}

export function useAddWater() {
	return async function (waterId: string, data: object) {
		return await addWater(waterId, data);
	};
}
