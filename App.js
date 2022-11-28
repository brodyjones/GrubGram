import { useState, useEffect, React } from 'react';
import './App.css';
import {db} from './firebase-config'
import {collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore"

function App() {
  const [newImage, setNewImage] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newRecipe, setNewRecipe] = useState("");

  const [userPosts, setUserPosts] = useState([]);
  const userPostsRef = collection(db, "user posts");

  const createUserPost = async () => {
    var today = new Date()
    await addDoc(userPostsRef, {username: "keithhoffy", imagelink: newImage, caption: newCaption, 
      datecreated: (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear(),
      recipe: newRecipe})
  }

  const deleteUserPost = async (id) => {
    const userPostDoc = doc(db, "user posts", id);
    await deleteDoc(userPostDoc);
  }

  useEffect(() => {
    const getUserPosts = async () => {
      const data = await getDocs(userPostsRef);
      setUserPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getUserPosts()
  }, [])

  return (
    <div className="App"> 
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
      {userPosts.map((userPost) => {
        return (
          <div>
            <h1>User: {userPost.username} </h1>
            <h1>Image Link: {userPost.imagelink} </h1>
            <h1>Caption: {userPost.caption} </h1>
            <h1>Date Created: {userPost.datecreated} </h1>
            <h1>Recipe Used: {userPost.recipe} </h1>
            <button onClick={() => {deleteUserPost(userPost.id)}}>Delete Post</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
