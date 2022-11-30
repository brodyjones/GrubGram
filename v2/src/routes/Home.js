import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { auth, db, signOut } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "../components/Navbar";

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
    <Navbar />
  );
}

export default Home;
