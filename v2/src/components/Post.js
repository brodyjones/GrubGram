import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import RecipeDialog from "./RecipeDialog";

export default function Post({ post }) {
  const [recipe, setRecipe] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [userFirstLetter, setuserFirstLetter] = useState("");
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const navSoc = () => {
    if (post.uid !== user?.uid) {
      navigate('/social', { state: { post } });
    }
    else {
      navigate('/profile');
    }
  }

  useEffect(() => {
    const getRecipe = async () => {
      const recipesRef = collection(db, "recipes");
      const q = query(recipesRef, where("name", "==", post.recipe));
      const querySnapshot = await getDocs(q);
      setRecipe(querySnapshot.docs[0].data());
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
      <CardHeader sx={{ my: -1 }}
        title={post.recipe}
        titleTypographyProps={{ variant: 'h6' }}
        subheader={post.timestamp}
        avatar={<Button onClick={navSoc}><Avatar sx={{ width: 50, height: 50 }} src={profilePic}>
          {userFirstLetter}
        </Avatar></Button>}
      />
      <CardMedia
        component="img"
        height="300"
        image={post.image}
      />
      <CardContent sx={{ mb: -3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
          {post.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          onClick={() => { updateLikeCount(post.likes); }}>
          <FavoriteIcon />
        </IconButton>
        <Typography sx={{ mr: 43 }}>{post.likes}</Typography>
        <RecipeDialog recipe={recipe} />
      </CardActions>
    </Card>
  );
}