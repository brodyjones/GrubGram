import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";

export default function CreatePost() {
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const [recipe, setRecipe] = useState("");
    const [user] = useAuthState(auth);

    const createUserPost = async () => {
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        const today = new Date();
        const dateCreated = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' +
            today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        const name = docSnap.data().name;
        await setDoc(doc(db, "posts", dateCreated), { name: name, image: image, caption: caption, recipe: recipe });
        await updateDoc(docRef, { posts: arrayUnion(dateCreated) });
        window.location.reload(false);
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