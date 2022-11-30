import Navbar from "../components/Navbar";
import "./Recipes.css";
import Recipe from "../components/Recipe"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Recipes() {
    return (
        <div>
            <Navbar />
            <Typography variant="h3">
                <Box sx={{ fontWeight: 'bold', m: 1 }}>Recommended Recipes</Box>
            </Typography>
            <Recipe />
        </div>
    );
}

export default Recipes;