import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Recipe({ recipe }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getUrl = async () => {
        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("name", "==", recipe.name));
        const querySnapshot = await getDocs(q);
        setUrl(querySnapshot.docs[0].data().url);
    }

    getUrl();
  }, [])

  return (
    <Card sx={{ width: 850, ml: 1 }}>
      <CardContent>
        <Typography variant="h5">
          {recipe.name}
        </Typography>
        <Typography variant="subtitle" color="text.secondary">
          Ingredients:
        </Typography>
        {recipe.ingredients.map((ingredient) => {
          return (
            < Typography variant="body2" >
              {ingredient}
            </Typography>
          );
        })}
        <Typography variant="subtitle" color="text.secondary">
          Preparation:
        </Typography>
        <Typography variant="body2">
          {recipe.preparation}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          varaint="contained"
          onClick={() => { window.open(url, '_blank') }}
        >
          Go To Website
        </Button>
      </CardActions>
    </Card>
  );
}