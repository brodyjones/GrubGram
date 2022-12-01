import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {auth, createUserWithEmailAndPassword, addDoc, db, collection} from "../firebase";
import "./Register.css";
import GrubGram from '../assests/GrubGram.png';


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      const user = newUser.user;
      const pantry = []
      await addDoc(collection(db, "users"), {uid: user.uid,name,email,pantry:pantry});
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  });

  return (
    <div className='registerpage'>
      <div className='title'>
        <div className='title_container'>
          <h1>Welcome To GrubGram</h1>
        </div>
        <img src ={GrubGram} alt='' height='100' width='100'/>
      </div>
      <div className="register">
        <div className="register_container">
          <input type="text" className="register_textBox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name"/>
          <input type="text" className="register_textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address"/>
          <input type="password" className="register_textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button className="register_btn" onClick={register}>Register</button>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
