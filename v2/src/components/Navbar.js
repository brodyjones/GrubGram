import { AppBar, Avatar, Button, createTheme, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme({
    palette: {
        primary: {
            main: red[700],
        },
        secondary: {
            main: '#FFFFFF',
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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    useEffect(() => {
        const getUserInfo = async () => {
            const userRef = doc(db, "users", user?.uid);
            const userSnap = await getDoc(userRef);
            setUserInfo(userSnap.data());
            setuserFirstLetter(userSnap.data().name[0])
        }

        getUserInfo();
    }, [user]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <ThemeProvider theme={theme}>
            <AppBar raised={true} color="primary" position="static">
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

                        <Button
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        ><Avatar src={userInfo.profilePic}>{userFirstLetter}</Avatar></Button>
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => {
                                handleClose();
                                logout();
                            }}>Logout</MenuItem>
                            <MenuItem 
                                sx={{ my: 2 }}
                                color="secondary"
                                href="/profile"
                                >Profile</MenuItem>
                        </Menu>

                    </Toolbar>
                </Container>
            </AppBar >
        </ThemeProvider>
    );
}
export default Navbar;