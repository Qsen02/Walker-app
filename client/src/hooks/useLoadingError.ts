import { useState } from "react";

export function useLoadingError(loadingState:boolean,errorState:boolean){
    const [loading,setLoading]=useState(loadingState);
    const [error,setError]=useState(errorState);

    return {
        loading,setLoading,error,setError
    }
}