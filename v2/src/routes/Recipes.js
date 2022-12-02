import { createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import Navbar from "../components/Navbar";
import RecipeSearcher from "../components/RecipeSearcher";

const theme = createTheme({
    palette: {
        primary: {
            main: red[600],
        },
        secondary: {
            main: '#FFFFFF',
        },
    },
});

export default function Recipes() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
                <RecipeSearcher />
            </div>
        </ThemeProvider>
    );
}