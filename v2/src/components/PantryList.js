import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function PantryList() {
    const [pantry, setPantry] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getPantry = async () => {
            const docRef = doc(db, "users", user?.uid);
            const docSnap = await getDoc(docRef);
            setPantry(docSnap.data().pantry);
        }
        getPantry();
    }, [user]);
    const removeIngredient = async (ingredient) => {
        const docRef = doc(db, "users", user?.uid);
        await updateDoc(docRef, { pantry: arrayRemove(ingredient) });
        window.location.reload(false);
    }

    return (
        <Card raised={true} sx={{ maxWidth: 350, ml: 20, mt: 3 }}>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <CardHeader
                    sx={{ mb: -3 }}
                    title="Your Pantry"
                    titleTypographyProps={{
                        variant: 'h5', fontFamily: 'monospace', fontWeight: 'bold'
                    }}
                />
                <CardContent>
                    {pantry.map((ingredient) => {
                        return (
                            <Typography variant="body1">
                                <IconButton sx={{ ml: -3 }} color="primary" onClick={() => (removeIngredient(ingredient))}><DeleteIcon></DeleteIcon></IconButton>
                                {ingredient}
                            </Typography>
                        );
                    })}
                </CardContent>
            </Grid>
        </Card>
    );
}