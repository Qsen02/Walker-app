import { Language } from "../types/UserAndTheme";

export function calculateAverageRed(data: Uint8Array) {
	"worklet";

	let redSum = 0;
	let pixelCount = 0;

	for (let i = 0; i < data.length; i += 3) {
		redSum += data[i];
		pixelCount++;
	}

	return redSum / pixelCount;
}

export function smoothSignal(signal: number[], windowSize = 3) {
	const smoothed = [];

	for (let i = 0; i < signal.length; i++) {
		let sum = 0;
		let count = 0;

		for (let j = i - windowSize; j <= i + windowSize; j++) {
			if (signal[j] !== undefined) {
				sum += signal[j];
				count++;
			}
		}

		smoothed.push(sum / count);
	}

	return smoothed;
}

export function detectPeaks(
	signal: number[],
	minDistance = 6,
	threshold = 125,
) {
	const peaks = [];

	let lastPeak = -Infinity;

	for (let i = 1; i < signal.length - 1; i++) {
		const prev = signal[i - 1];
		const curr = signal[i];
		const next = signal[i + 1];

		const isPeak = curr > prev && curr > next && curr > threshold;

		if (isPeak && i - lastPeak >= minDistance) {
			peaks.push(i);
			lastPeak = i;
		}
	}

	return peaks;
}

export function calculateBPM(peaks: number[], fps: number) {
	if (peaks.length < 2) return 0;

	const intervals = [];

	for (let i = 1; i < peaks.length; i++) {
		intervals.push(peaks[i] - peaks[i - 1]);
	}

	const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

	return (60 * fps) / avgInterval;
}

export function getPulseStatus(bpm: number, language: Language | undefined) {
	if (language === "bulgarian") {
		if (bpm < 60) {
			return {
				text: "Нисък пулс",
				description: "Пулсът е под нормалните стойности в покой.",
			};
		}

		if (bpm <= 75) {
			return {
				text: "Отличен пулс",
				description: "Пулсът е в много добра норма.",
			};
		}

		if (bpm <= 90) {
			return {
				text: "Нормален пулс",
				description: "Пулсът е в нормални граници.",
			};
		}

		return {
			text: "Повишен пулс",
			description: "Пулсът е по-висок от нормалното.",
		};
	}

	if (bpm < 60) {
		return {
			text: "Low pulse",
			description: "Pulse is below normal resting values.",
		};
	}

	if (bpm <= 75) {
		return {
			text: "Excellent pulse",
			description: "Pulse is in a very healthy range.",
		};
	}

	if (bpm <= 90) {
		return {
			text: "Normal pulse",
			description: "Pulse is within normal limits.",
		};
	}

	return {
		text: "Elevated pulse",
		description: "Pulse is higher than normal resting values.",
	};
}
