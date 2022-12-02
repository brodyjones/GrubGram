import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Post({ post }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDoc = doc(db, "recipes", post.recipe);
      const docSnap = await getDoc(recipeDoc);
      console.log(docSnap.data().url);
      setUrl(docSnap.data().url);
    }

    getRecipe();
  }, []);

  const updateLikeCount = async (l) => {
      const docRef = doc(db, "posts", post.id);
      await updateDoc(docRef, { likes: l + 1 });
  }

  return (
    <Card sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
      <CardHeader
        title={post.name}
        subheader={post.timestamp}
      />
      <CardMedia
        component="img"
        height="250"
        image={post.image}
      />
      <CardActions>
        <IconButton onClick={() => {updateLikeCount(post.likes);}}>
            <FavoriteIcon/>
        </IconButton>
        <Typography sx={{mr:20}}>{post.likes}</Typography>
        <Button
          variant="contained"
          onClick={() => { window.open(url, '_blank') }}
        >
          {post.recipe}
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
    </Card>
  );
}