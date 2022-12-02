import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostFeed from "../components/PostFeed";
import { auth, db } from "../firebase";

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();


    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
        const getPosts = async () => {
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("uid", "==", user?.uid));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => (doc.data()));
            setPosts(data);
        }
        getPosts();
    }, [user, loading, navigate]);


    return (
        <div>
            <Navbar />
            <PostFeed posts={posts} />
        </div>
    );
}