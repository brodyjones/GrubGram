import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../components/Navbar";
import PostFeed from "../components/PostFeed";
import { auth, db } from "../firebase";

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getPosts = async () => {
            const postsRef = collection(db, "posts");
            console.log(user?.uid);
            const q = query(postsRef, where("uid", "==", user?.uid));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => (doc.data()));
            setPosts(data);
        }
        getPosts();
    }, [user]);

    return (
        <div>
            <Navbar />
            <PostFeed posts={posts} />
        </div>
    );
}