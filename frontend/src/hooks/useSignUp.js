import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useSignUp = ()=>{
    const [loading,setLoading] = useState(null);
    const [error,setError] = useState(null);
    const {dispatch} = useAuthContext();
    const signup = async (email,password)=>{
        setLoading(true);
        setError(null)
        const response = await fetch('/api/user/signup',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email,password})
        })
        console.log(response);
        const data = await response.json();
        console.log(data);
        if(!response.ok){
            setLoading(false);
            setError(data.error);
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(data));
            dispatch({type:'LOGIN',payload:data});
            setLoading(false);
        }
        
    }
        return {signup,loading,error}
    }
