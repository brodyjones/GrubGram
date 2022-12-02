import { Avatar, Card, CardHeader } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostFeed from "../components/PostFeed";
import { db } from "../firebase";
import './Profile.css'

export default function Social() {
    const location = useLocation();
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const getUserPosts = async () => {
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("name", "==", location.state.post.name));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setUserPosts(data);
        }

        const getUser = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("name", "==", location.state.post.name));
            const querySnapshot = await getDocs(q);
            setUser(querySnapshot.docs[0].data());
        }
      
        getUserPosts();
        getUser();
    }, [])
    
    return (
        <div>
            <Navbar/>
            <div className='left'>
                <PostFeed posts={userPosts}/>
            </div>
            <div className='right'>
                <Card raised={true} sx={{ maxWidth: 275, ml: 20, mt: 3 }}>
                    <CardHeader title={user.name}/>
                    <Avatar sx={{ height: 200, width: 200 }} src={user.profilePic}/>
                </Card>
            </div>
        </div>
    );
}