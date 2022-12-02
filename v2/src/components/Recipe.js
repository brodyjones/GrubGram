import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export default function Recipe({ recipe }) {
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
        >
          Go To Website
        </Button>
      </CardActions>
    </Card>
  );
}