import { createPulse } from "../api/pulsesService"

export function useCreatePulse() { 
    return async function (userId: string, data: object) { 
        return await createPulse(userId, data);
    }
}
