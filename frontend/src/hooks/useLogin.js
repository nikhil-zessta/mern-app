import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useLogin = ()=>{
    const [loading,setLoading] = useState(null);
    const [error,setError] = useState(null);
    const {dispatch} = useAuthContext();
    const login = async (email,password)=>{
        setLoading(true);
        setError(null)
        const response = await fetch('/api/user/login',{
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
        return {login,loading,error}
    }
