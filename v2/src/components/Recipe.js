import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export default function Recipe({ recipe }) {
  if (!recipe) return;
  return (
    <Card raised={true} sx={{ width: 600, ml: -15 }}>
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
          onClick={() => { window.open(recipe.url, '_blank') }}
        >
          Go To Website
        </Button>
      </CardActions>
    </Card>
  );
}