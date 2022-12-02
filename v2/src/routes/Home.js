import { createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import PostFeed from "../components/PostFeed";
import { auth, db } from "../firebase";
import "./Home.css"

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[600],
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

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
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(data);
    }
    getPosts();
  }, [user, loading, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="rightHome">
        <CreatePost />
      </div>
      <div className="leftHome">
        <PostFeed posts={posts} />
      </div>
    </ThemeProvider>
  );
}