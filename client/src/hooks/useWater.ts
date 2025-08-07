import { useEffect, useState } from "react";
import { Water } from "../types/water";
import { useLoadingError } from "./useLoadingError";
import { getWaterById } from "../api/waterService";

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
		(async () => {
			try {
				setLoading(true);
				const curWater = await getWaterById(waterId);
				setWater(curWater);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();
	}, []);

	return {
		water,
		loading,
		error,
	};
}
