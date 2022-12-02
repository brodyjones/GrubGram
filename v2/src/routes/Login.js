import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, CardHeader, CardContent, TextField, Button, CardActions, Avatar, Grid, createTheme, ThemeProvider } from "@mui/material";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { red } from "@mui/material/colors";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Invalid login");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [loading, user, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Card sx={{ mt: 16, width: 324 }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <CardHeader
              sx={{ mt: 3 }}
              avatar={
                <Avatar sx={{ mr: -1, color: red[600], bgcolor: '#FFFFFF' }}>
                  <FastfoodRoundedIcon sx={{ fontSize: 37 }} />
                </Avatar>
              }
              titleTypographyProps={{ fontWeight: 'bold', color: 'primary', fontSize: 35, variant: 'h4', fontFamily: 'monospace' }}
              title="GrubGram"
              style={{ align: 'center' }}
            />
            <CardContent sx={{ mt: 2 }}>
              <TextField
                sx={{ width: 260 }}
                onChange={(event) => setEmail(event.target.value)}
                label="E-mail Address"
                type={'text'}
                id="filled-basic"
              /><br />
              <TextField
                sx={{ mt: 1, width: 260 }}
                onChange={(event) => setPassword(event.target.value)}
                label="Password"
                type={'password'}
                id="filled-basic"
              />
            </CardContent>
            <CardActions>
              <Button
                sx={{ bgcolor: 'primary' }}
                variant="contained"
                onClick={() => logInWithEmailAndPassword(email, password)}
              >
                Login
              </Button>
              <Button
                sx={{ ml: 1, color: 'primary' }}
                href="/register"
                variant="outlined"
              >
                Create Account
              </Button>
            </CardActions>
          </Grid>
          <br />
        </Card>
      </Grid>
    </ThemeProvider>
  );
}