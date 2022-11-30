import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

function Home() {
  return (
    <div>
      <Navbar/>
      <CreatePost/>
      <Post/>
    </div>
  );
}

export default Home;
