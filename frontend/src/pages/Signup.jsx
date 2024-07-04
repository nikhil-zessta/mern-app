import { useRef } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { signup, error, loading } = useSignUp();
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup(emailRef.current.value, passwordRef.current.value);
    if (res.ok) {
      navigate("/");
    }
    console.log(emailRef.current.value, " ", passwordRef.current.value);
  }
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Signup</h3>
      <label>Email:</label>
      <input type="email" ref={emailRef} />
      <label>Password:</label>
      <input type="password" ref={passwordRef} />
      <button disabled={loading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
