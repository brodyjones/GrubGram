import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import PostFeed from "../components/PostFeed";
import { auth, db } from "../firebase";
import "./Home.css"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    const getPosts = async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => (doc.data()));
      setPosts(data);
    }
    getPosts();
  }, [user, loading, navigate]);

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