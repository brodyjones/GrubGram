import { Typography } from "@mui/material";

export default function RecipeContent({ recipe }) {
    if (!recipe) return;
    return (
        <div>
            <Typography variant="subtitle">
                Ingredients
            </Typography>
            {recipe.ingredients.map((ingredient) => {
                return (
                    < Typography variant="body2" >
                        {ingredient}
                    </Typography>
                );
            })}
            <Typography variant="subtitle">
                Preparation
            </Typography>
            <Typography variant="body2">
                {recipe.preparation}
            </Typography>
        </div>
    );
}