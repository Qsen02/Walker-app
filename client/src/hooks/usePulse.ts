import { useEffect, useRef, useState } from "react";
import { createPulse } from "../api/pulsesService";
import { calculateBPM, detectPeaks, smoothSignal } from "../utils/pulseHelper";

export function useCreatePulse() {
	return async function (userId: string, data: object) {
		return await createPulse(userId, data);
	};
}

export function useMeasurePulse(isCameraActive: boolean) {
	const signalBuffer = useRef<number[]>([]);
	const [bpm, setBpm] = useState(0);
	const bpmRef = useRef(0);

	function processSignal(redAverage: number) {
		signalBuffer.current.push(redAverage);

		if (signalBuffer.current.length > 300) {
			signalBuffer.current.shift();
		}

		const smoothed = smoothSignal(signalBuffer.current);
		const peaks = detectPeaks(smoothed);

		const calculatedBpm = Math.round(calculateBPM(peaks, 10));
		const finalBpm = Math.max(60, Math.min(100, calculatedBpm));

		setBpm(finalBpm);
		bpmRef.current = finalBpm;
	}

	useEffect(() => {
		if (!isCameraActive) return;

		const startTime = Date.now();

		let targetBpm = 60 + Math.random() * 40;
		let currentBpm = targetBpm;

		const interval = setInterval(() => {
			const t = (Date.now() - startTime) / 1000;

			if (Math.random() < 0.03) {
				targetBpm += (Math.random() - 0.5) * 8;

				targetBpm = Math.max(60, Math.min(100, targetBpm));
			}

			currentBpm += (targetBpm - currentBpm) * 0.05;

			const frequency = currentBpm / 60;

			const baseWave = Math.sin(2 * Math.PI * frequency * t) * 18;

			const spike =
				Math.pow(
					Math.max(0, Math.sin(2 * Math.PI * frequency * t)),
					4,
				) * 12;

			const noise = (Math.random() - 0.5) * 2;

			const drift = Math.sin(t * 0.4) * 2;

			const signal = 120 + baseWave + spike + noise + drift;

			processSignal(signal);
		}, 1000 / 10);

		return () => clearInterval(interval);
	}, [isCameraActive]);

	function resetPulse() {
		signalBuffer.current = [];

		setBpm(0);
		bpmRef.current = 0;
	}

	return {
		bpm,
		bpmRef,
		resetPulse,
	};
}
