import { Button, Typography } from "@mui/material";

export default function RecipeContent({ recipe }) {
    if (!recipe) return;
    return (
        <div>
            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle">
                Ingredients
            </Typography>
            {recipe.ingredients.map((ingredient) => {
                return (
                    < Typography variant="body2" >
                        {ingredient}
                    </Typography>
                );
            })}
            <br></br>
            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle">
                Preparation
            </Typography>
            <Typography variant="body2">
                {recipe.preparation}
            </Typography>
            <br></br>
            <Button
                variant="text"
                onClick={() => { window.open(recipe.url, '_blank') }}
            >
                GO TO WEBSITE
            </Button>
        </div>
    );
}