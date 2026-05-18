export type AccelPoint = {
	x: number;
	y: number;
	z: number;
};

export function getMagnitude({ x, y, z }: AccelPoint) {
	return Math.sqrt(x * x + y * y + z * z);
}

const windowSize = 5;
let buffer: number[] = [];

export function smooth(value: number) {
	buffer.push(value);

	if (buffer.length > windowSize) {
		buffer.shift();
	}

	const sum = buffer.reduce((a, b) => a + b, 0);
	return sum / buffer.length;
}

let lastValue = 0;
let lastStepTime = 0;

export function detectStep(value: number, threshold = 1.2, cooldown = 300) {
	const now = Date.now();

	const isPeak = value > threshold && lastValue <= threshold;
	const isCooldown = now - lastStepTime < cooldown;

	lastValue = value;

	if (isPeak && !isCooldown) {
		lastStepTime = now;
		return true;
	}

	return false;
}

export function resetStepProcessing() {
    buffer = [];
    lastValue = 0;
    lastStepTime = 0;
}