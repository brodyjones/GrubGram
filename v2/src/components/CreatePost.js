import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as React from 'react';

function CreatePost() {
    const [newImage, setNewImage] = useState("");
    const [newCaption, setNewCaption] = useState("");
    const [newRecipe, setNewRecipe] = useState("");
    const userPostsRef = collection(db, "user posts");
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");

        getUser();
    });

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

    return (
      <div>
        <input 
            placeholder='Image...' 
            onChange={(event) => {
                setNewImage(event.target.value);
            }}
        />
        <br></br>
        <input 
            placeholder='Caption...' 
            onChange={(event) => {
                setNewCaption(event.target.value);
            }}
        />
        <br></br>
        <input 
            placeholder='Recipe...' 
            onChange={(event) => {
                setNewRecipe(event.target.value);
            }}
        />
        <br></br>
        <button onClick={createUserPost}>Post</button>
      </div>
    );
}

export default CreatePost;