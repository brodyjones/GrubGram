import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import PostFeed from "../components/PostFeed";
import { db } from "../firebase";
import "./Home.css"

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => (doc.data()));
      setPosts(data);
    }
    getPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="column2">
        <CreatePost />
      </div>
      <div className="column1">
        <PostFeed posts={posts} />
      </div>
    </div>
  );
}