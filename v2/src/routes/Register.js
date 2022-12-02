import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, createTheme, Grid, TextField, ThemeProvider } from "@mui/material";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[600],
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [loading, user, navigate]);

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      await setDoc(doc(db, "users", user.uid), { name: name, bio: "", pantry: [], profilePic: "" });
    } catch (error) {
      alert("Invalid registration");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Card raised={true} sx={{ mt: 12, width: 324 }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <CardHeader
              sx={{ mt: 3 }}
              avatar={
                <Avatar sx={{ mr: -1, color: red[500], bgcolor: '#FFFFFF' }}>
                  <FastfoodRoundedIcon sx={{ fontSize: 37 }} />
                </Avatar>
              }
              titleTypographyProps={{ fontWeight: 'bold', color: 'primary', fontSize: 35, variant: 'h4', fontFamily: 'monospace' }}
              title="GrubGram"
              style={{ align: 'center' }}
            />
          </Grid>
          <CardContent sx={{ mt: 2, mx: 2 }}>
            <TextField
              sx={{ mb: 1, width: 260 }}
              onChange={(event) => setName(event.target.value)}
              label="Full Name"
              type={'text'}
              id="filled-basic"
            />
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
          <CardActions sx={{ ml: 3.5 }}>
            <Button
              variant="contained"
              onClick={() => registerWithEmailAndPassword(name, email, password)}
            >
              Create Account
            </Button>
            <Button
              sx={{ ml: 1 }}
              href="/"
              variant="outlined"
            >
              Login
            </Button>
          </CardActions>
          <br />
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

export default Register;
