import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import { auth, signOut } from "../firebase";
import { Navigate } from 'react-router-dom';




function Navbar() {
    const logout = () => {
        signOut(auth);

    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FastfoodRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        GrubGram
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            sx={{ my: 2, color: 'white' }}
                            href="/home"
                        >
                            Home
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white' }}
                            href="/pantry"
                        >
                            Pantry
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white' }}
                            href="/recipes"
                        >
                            Recipes
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            sx={{ my: 2, color: 'white' }}
                            onClick={logout}
                            href="/"
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;