import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, db } from "../firebase";
import "./Register.css";
import GrubGram from '../assests/GrubGram.png';
import { doc, setDoc } from "firebase/firestore";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      await setDoc(doc(db, "users", user.uid), { name: name, pantry: [] });
    } catch (error) {
      alert("Invalid registration");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [loading, user, navigate]);

  return (
    <div className='registerpage'>
      <div className='title'>
        <div className='title_container'>
          <h1>Welcome To GrubGram</h1>
        </div>
        <img src={GrubGram} alt='' height='100' width='100' />
      </div>
      <div className="register">
        <div className="register_container">
          <input type="text" className="register_textBox" value={name} onChange={(event) => setName(event.target.value)} placeholder="Full Name" />
          <input type="text" className="register_textBox" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-mail Address" />
          <input type="password" className="register_textBox" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
          <button className="register_btn" onClick={() => registerWithEmailAndPassword(name, email, password)}>Register</button>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
