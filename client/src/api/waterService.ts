import { Water } from "../types/water";
import { get, post, put } from "./requester";

const endpoint = "water";

export async function getWaterById(waterId:string | undefined){
    const data = await get(`${endpoint}/${waterId}`);
    return data as Water;
}

export async function createWater(){
    const data = await post(endpoint,{});
    return data as Water;
}

export async function addWater(waterId:string,data:object){
    const updatedData = await put(`${endpoint}/${waterId}`,data);
    return updatedData as Water;
}