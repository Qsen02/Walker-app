import { Steps } from "../types/steps";
import { User, UserForAuth } from "../types/user";
import { Water } from "../types/water";
import { get, post, put } from "./requester";

const endpoint = "/users";

export async function logout(){
    await get(`${endpoint}/logout`);
}

export async function getUserById(userId: string) {
	const data = await get(`${endpoint}/${userId}`);
	return data as User;
}

export async function getActiveDays(userId:string){
    const data=await get(`${endpoint}/${userId}/active-days`);
    return data as Steps[];
}

export async function getWaterDays(userId:string){
    const data=await get(`${endpoint}/${userId}/water-days`);
    return data as Water[];
}

export async function register(data: object) {
	const newData = await post(`${endpoint}/register`, data);
	return newData as UserForAuth;
}

export async function login(data:object){
    const newData = await post(`${endpoint}/login`, data);
	return newData as UserForAuth;
}

export async function editUser(userId:string,data:object){
    const updatedData = await put(`${endpoint}/${userId}/edit`,data);
    return updatedData as User;
}

export async function changePassword(userId:string,data:object){
    const updatedData = await put(`${endpoint}/${userId}/change-password`,data);
    return updatedData as User;
}