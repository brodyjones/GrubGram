import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { red } from '@mui/material/colors';

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
                        fontSize: 26, color: red[600], fontFamily: 'monospace', fontWeight: 'bold'
                    }}
                />
                <CardContent>
                    {pantry.map((ingredient) => {
                        return (
                            <Typography variant="h6">
                                {ingredient}
                            </Typography>
                        );
                    })}
                </CardContent>
            </Grid>
        </Card>
    );
}