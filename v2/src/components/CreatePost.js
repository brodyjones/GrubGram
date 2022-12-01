import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

function CreatePost() {
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const [recipe, setRecipe] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");

    }, [loading, user, navigate]);

    const createUserPost = async () => {
        try {
            const docRef = doc(db, "users", user?.uid);
            const docSnap = await getDoc(docRef);
            const name = docSnap.data().name;

            const today = new Date();
            const dateCreated = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' +
                today.getHours() + ':' + today.getMinutes();

            await setDoc(doc(db, "posts", dateCreated), { name: name, image: image, caption: caption, recipe: recipe });
            await updateDoc(docRef, { posts: arrayUnion(dateCreated) });
            window.location.reload(false);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }

    return (
        <Card sx={{ width: 300, mt: 3 }}>
            <CardHeader title="Create a Post"></CardHeader>
            <CardContent>
                <TextField type='file'
                    sx={{ mt: 1, mb: 1 }}
                    id="filled-basic"
                    onChange={(event) => {
                        setImage(event.target.value);
                    }}
                />
                <br></br>
                <TextField
                    sx={{ mt: 1, mb: 1 }}
                    id="filled-basic"
                    label='Caption...'
                    onChange={(event) => {
                        setCaption(event.target.value);
                    }}
                />
                <br></br>
                <TextField
                    sx={{ mt: 1, mb: 1 }}
                    id="filled-basic"
                    label='Recipe...'
                    onChange={(event) => {
                        setRecipe(event.target.value);
                    }}
                />
                <br></br>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={createUserPost}>Post</Button>
            </CardActions>
        </Card>
    );
}

export default CreatePost;