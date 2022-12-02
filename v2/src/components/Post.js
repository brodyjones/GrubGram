import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

export default function Post({ post }) {
  const [url, setUrl] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userFirstLetter, setuserFirstLetter] = useState("");
  const navigate = useNavigate();

  const navSoc = () => {
    navigate('/social', {state: {post}});
  }

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
    <Card
      raised={true}
      sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
      <CardHeader
        title={post.recipe}
        titleTypographyProps={{ color: red[600], variant: 'h6', fontFamily: 'monospace', fontSize: 25, fontWeight: 'bold' }}
        subheader={post.timestamp}
        avatar={<Button onClick={navSoc}><Avatar  sx={{ width: 50, height: 50 }} src={profilePic}>
                  {userFirstLetter}
                </Avatar></Button>}
      />
      <CardMedia
        component="img"
        height="250"
        image={post.image}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
          {post.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          sx={{ color: red[600] }}
          onClick={() => { updateLikeCount(post.likes); }}>
          <FavoriteIcon />
        </IconButton>
        <Typography sx={{ mr: 34 }}>{post.likes}</Typography>
        <Button
          sx={{ bgcolor: red[600] }}
          variant="contained"
          onClick={() => { window.open(url, '_blank') }}
        >
          GO TO WEBSITE
        </Button>
      </CardActions>
    </Card>
  );
}