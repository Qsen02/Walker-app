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

export function detectPeaks(signal: number[], minDistance = 4) {
	const peaks = [];
	let lastPeak = -Infinity;

	for (let i = 1; i < signal.length - 1; i++) {
		const prev = signal[i - 1];
		const curr = signal[i];
		const next = signal[i + 1];

		const isPeak = curr > prev && curr > next;

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

	return Math.round((60 * fps) / avgInterval);
}
