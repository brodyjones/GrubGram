<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword} from "../firebase";
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
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/home");
  }, [loading, user, navigate]);

  return (
    <div className="loginpage">
      <div className='title'>
        <div className='title_container'>
          <h1>Welcome To GrubGram</h1>
        </div>
      <img src ={GrubGram} alt='' height='100' width='100'/>
      </div>
      <div className='login'>
        <div className="login_container">
          <input type="text" className="login_textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address"/>
          <input type="password" className="login_textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button className="login_btn" onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>
          <div>Don't have an account? <Link to="/register">Register</Link> now.</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
=======
function Login() {
    return (
        <p>
            login
        </p>
    );
}

export default Login;
>>>>>>> acb5fe77793dc374e2318e8973b4c3bc863981fc
