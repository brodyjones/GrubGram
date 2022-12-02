import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Post({ post }) {
  const [url, setUrl] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userFirstLetter, setuserFirstLetter] = useState("");

  useEffect(() => {
    const getRecipe = async () => {
      const recipesRef = collection(db, "recipes");
      const q = query(recipesRef, where("name", "==", post.recipe));
      const querySnapshot = await getDocs(q);
      setUrl(querySnapshot.docs[0].data().url);
    }

    const getProfilePic = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("name", "==", post.name));
      const querySnapshot = await getDocs(q);
      setProfilePic(querySnapshot.docs[0].data().profilePic);
      setuserFirstLetter(querySnapshot.docs[0].data().name[0])
    }

    getProfilePic();
    getRecipe();
  }, []);

  const updateLikeCount = async (l) => {
      const docRef = doc(db, "posts", post.id);
      await updateDoc(docRef, { likes: l + 1 });
  }

  return (
    <Card sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
      <CardHeader
        title={post.recipe}
        subheader={post.timestamp}
        avatar={<Avatar src={profilePic}>{userFirstLetter}</Avatar>}
      />
      <CardMedia
        component="img"
        height="250"
        image={post.image}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{fontWeight: "bold"}}>
          {post.name}:  {post.caption}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => {updateLikeCount(post.likes);}}>
            <FavoriteIcon/>
        </IconButton>
        <Typography>{post.likes}</Typography>
        <Button
          variant="contained"
          onClick={() => { window.open(url, '_blank') }}
        >
          GO TO WEBSITE
        </Button>
      </CardActions>
    </Card>
  );
}