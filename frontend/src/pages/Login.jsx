import { useRef } from "react"
import { useLogin } from "../hooks/useLogin";

export default function Login(){
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const {login,loading,error} = useLogin();
    async function handleSubmit(e){
        e.preventDefault();
        await login(emailRef.current.value,passwordRef.current.value) 
    }
    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email:</label>
            <input type="email" ref={emailRef}/>
            <label>Password:</label>
            <input type="password" ref={passwordRef}/>
            <button disabled={loading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
