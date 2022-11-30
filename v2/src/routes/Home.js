import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

function Home() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [newImage, setNewImage] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newRecipe, setNewRecipe] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const userPostsRef = collection(db, "user posts");

  const createUserPost = async () => {
    var today = new Date()
    await addDoc(userPostsRef, {username: name, imagelink: newImage, caption: newCaption, 
      datecreated: (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+
      today.getHours()+':'+today.getMinutes(), recipe: newRecipe})
      window.location.reload(false);
  }

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

  return (
    <div>
      <Navbar/>
      <Post/>
      <input 
        placeholder='Image...' 
        onChange={(event) => {
          setNewImage(event.target.value);
        }}
      />
      <input 
        placeholder='Caption...' 
        onChange={(event) => 
          {setNewCaption(event.target.value)
        }}
      />
      <input 
        placeholder='Recipe...' 
        onChange={(event) => {
          setNewRecipe(event.target.value)
        }}
      />
      <button onClick={createUserPost}>Post</button>
    </div>
  );
}

export default Home;
