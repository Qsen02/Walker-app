import { Pulse } from "../types/pulse";
import { get, post } from "./requester";

const endpoint = "/pulse";

export async function getAllPulses() {
	const pulses = await get(endpoint);
	return pulses as Pulse[];
}

export async function paginatePulses(page: number) {
	const pulses = await get(
		`${endpoint}/page?page=${encodeURIComponent(page)}`,
	);
	return pulses as Pulse[];
}

export async function getPulseById(pulseId: string) {
	const pulse = await get(`${endpoint}/${pulseId}`);
	return pulse as Pulse;
}

export async function createPulse(data: object) {
    const newPulse = await post(endpoint,data);
	return newPulse as Pulse;
}
