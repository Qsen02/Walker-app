import { Steps } from "../types/steps";
import { get, post, put } from "./requester";

const endpoint="steps";

export async function getStepsById(stpesId:string){
    const data=await get(`${endpoint}/${stpesId}`);
    return data as Steps;
}

export async function createSteps(){
    const data = await post(endpoint,{});
    return data as Steps;
}

export async function incrementSteps(stepsId:string){
    const updatedData = await put(`${endpoint}/${stepsId}`,{});
    return updatedData as Steps;
}