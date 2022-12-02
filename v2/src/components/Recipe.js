import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import RecipeContent from "./RecipeContent";

export default function Recipe({ recipe }) {
  if (!recipe) return;
  return (
    <Accordion sx={{ ml: -6, mr: 8 }}>
      <AccordionSummary>
        <Typography variant="h6">
          {recipe.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <RecipeContent recipe={recipe} />
      </AccordionDetails>
    </Accordion>
  );
}