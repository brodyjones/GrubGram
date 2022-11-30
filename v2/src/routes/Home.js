import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

function Home() {
  return (
    <div>
      <Navbar/>
      <div className="column2">
        <CreatePost/>
      </div>
      <div classname="column1">
        <Post/>
      </div>
    </div>
  );
}

export default Home;
