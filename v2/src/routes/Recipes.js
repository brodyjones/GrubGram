import Navbar from "../components/Navbar";
import "./Recipes.css";
import Recipe from "../components/Recipe"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Recipes() {
    return (
        <div>
            <Navbar />
            <Box
                sx={{ backgroundColor: "white", m: 1, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
                <Typography sx={{ my: 1.5, fontWeight: 'bold' }} variant="h3">
                    Top 10 Recommended Recipes Based on Your Pantry
                </Typography>
            </Box>
            <Recipe />
        </div>
    );
}

export default Recipes;