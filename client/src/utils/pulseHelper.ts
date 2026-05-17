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

export function smoothSignal(signal: number[], windowSize = 5) {
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

export function detectPeaks(signal: number[]) {
	const peaks = [];

	for (let i = 1; i < signal.length - 1; i++) {
		if (signal[i] > signal[i - 1] && signal[i] > signal[i + 1]) {
			peaks.push(i);
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