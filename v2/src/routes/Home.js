<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { auth, db, signOut } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Home() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const queryUser = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(queryUser);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    getUser();
  });

  const logout = () => {
    signOut(auth);
  };

  return (
    <div className="home">
      <div className="home_container">Logged in as<div>{name}</div>
        <div>{user?.email}</div>
        <button className="home_btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
=======
function Home() {
    return (
        <p>
            home
        </p>
    );
}

export default Home;
>>>>>>> acb5fe77793dc374e2318e8973b4c3bc863981fc
