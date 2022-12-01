import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import GrubGram from '../assests/GrubGram.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Invalid login");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [loading, user, navigate]);

  return (
    <div className="loginpage">
      <div className='title'>
        <div className='title_container'>
          <h1>Welcome To GrubGram</h1>
        </div>
        <img src={GrubGram} alt='' height='100' width='100' />
      </div>
      <div className='login'>
        <div className="login_container">
          <input type="text" className="login_textBox" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-mail Address" />
          <input type="password" className="login_textBox" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
          <button className="login_btn" onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>
          <div>Don't have an account? <Link to="/register">Register</Link> now.</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
