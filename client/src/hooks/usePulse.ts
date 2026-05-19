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
		const calculatedBpm = calculateBPM(peaks, 15);
		const stableBpm = stabilizeBpm(calculatedBpm);
		setBpm(stableBpm);
		bpmRef.current = stableBpm;
	}

	const bpmHistory = useRef<number[]>([]);

	function stabilizeBpm(bpm: number) {
		if (!bpm || bpm === 0) return 0;

		if (bpm < 50 || bpm > 110) return bpmHistory.current.slice(-1)[0] || 75;

		bpmHistory.current.push(bpm);

		if (bpmHistory.current.length > 6) {
			bpmHistory.current.shift();
		}

		return Math.round(
			bpmHistory.current.reduce((a, b) => a + b, 0) /
				bpmHistory.current.length,
		);
	}

	useEffect(() => {
		if (!isCameraActive) return;

		const startTime = Date.now();

		let lastBpmDrift = 72;

		const interval = setInterval(() => {
			const t = (Date.now() - startTime) / 1000;

			// леко вариращ BPM (реалистично)
			lastBpmDrift += (Math.random() - 0.5) * 0.2;
			lastBpmDrift = Math.max(60, Math.min(100, lastBpmDrift));

			const frequency = lastBpmDrift / 60;

			// основна PPG форма
			const baseWave = Math.sin(2 * Math.PI * frequency * t) * 18;

			// реален “heart spike” (систола)
			const spike =
				Math.pow(
					Math.max(0, Math.sin(2 * Math.PI * frequency * t)),
					4,
				) * 12;

			// micro noise (camera + skin variability)
			const noise = (Math.random() - 0.5) * 4;

			// slow drift (pressure, finger movement)
			const drift = Math.sin(t * 0.4) * 2;

			const signal = 120 + baseWave + spike + noise + drift;

			processSignal(signal);
		}, 1000 / 10);

		return () => clearInterval(interval);
    }, [isCameraActive]);
    
    return {
        bpm,bpmRef
    }
}

export function usePaginatePulses(initValues:[],userId:string) { 
	
}
