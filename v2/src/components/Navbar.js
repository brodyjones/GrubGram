import { AppBar, Avatar, Button, createTheme, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const theme = createTheme({
    palette: {
        primary: {
            main: red[600],
        },
        secondary: {
            main: yellow[500],
        },
    },
});

function Navbar() {
    const logout = () => {
        signOut(auth);
    };
    const [userInfo, setUserInfo] = useState([]);
    const [user] = useAuthState(auth);
    const [userFirstLetter, setuserFirstLetter] = useState("");
    useEffect(() => {
        const getUserInfo = async () => {
            const userRef = doc(db, "users", user?.uid);
            const userSnap = await getDoc(userRef);
            setUserInfo(userSnap.data());
            setuserFirstLetter(userSnap.data().name[0])
        }
    
        getUserInfo();
    }, [user]);

    return (
        <ThemeProvider theme={theme}>
            <AppBar color="primary" position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <FastfoodRoundedIcon color="secondary" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            color="secondary"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                            }}
                        >
                            GrubGram
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                sx={{ my: 2 }}
                                color="secondary"
                                href="/home"
                            >
                                Home
                            </Button>
                            <Button
                                sx={{ my: 2 }}
                                color="secondary"
                                href="/pantry"
                            >
                                Pantry
                            </Button>
                            <Button
                                sx={{ my: 2 }}
                                color="secondary"
                                href="/recipes"
                            >
                                Recipes
                            </Button>
                            <Button
                                sx={{ my: 2 }}
                                color="secondary"
                                href="/profile"
                            >
                                Profile
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Button
                                sx={{ my: 2 }}
                                color="secondary"
                                onClick={logout}
                                href="/"
                            >
                                Logout
                            </Button>
                        </Box>

                        <Avatar src={userInfo.profilePic}>{userFirstLetter}</Avatar>
                    </Toolbar>
                </Container>
            </AppBar >
        </ThemeProvider>
    );
}
export default Navbar;