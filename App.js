import { useState, useEffect, React } from 'react';
import {db} from './firebase-config'
import {collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore"
import './App.css'

function App() {
  const [newImage, setNewImage] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newRecipe, setNewRecipe] = useState("");

  const [userPosts, setUserPosts] = useState([]);
  const userPostsRef = collection(db, "user posts");

  const createUserPost = async () => {
    var today = new Date()
    await addDoc(userPostsRef, {username: "keithhoffy", imagelink: newImage, caption: newCaption, 
      datecreated: (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+
      today.getHours()+':'+today.getMinutes(), recipe: newRecipe})
      window.location.reload(false);
  }

  const deleteUserPost = async (id) => {
    const userPostDoc = doc(db, "user posts", id);
    await deleteDoc(userPostDoc);
    window.location.reload(false);
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
    <div style={styles.header}>GrubGram</div>
    <br></br>
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
          <div style={styles.main}>
            <h1>User: {userPost.username} </h1>
            <h1>Image Link: {userPost.imagelink} </h1>
            <h1>Caption: {userPost.caption} </h1>
            <h1>Date Created: {userPost.datecreated} </h1>
            <h1>Recipe Used: {userPost.recipe} </h1>
            <button onClick={() => {deleteUserPost(userPost.id)}}>Delete Post</button>
          </div>
        );
      })}
      <br></br>
      <div style={styles.footer}>GrubGram Crew: Kriteen Jain, Keith Hoffmeister, 
        Sean Hoffmeister, Kavin Balakrishnan, Brody Jones</div>
    </div>
  );

}

const styles = {
  header: {
    color: 'red', 
    fontSize: 75, 
  },
  main: {
    fontSize: 10,
    color: 'green'
  },
  footer: {
    fontSize: 15
  }
};

export default App;
