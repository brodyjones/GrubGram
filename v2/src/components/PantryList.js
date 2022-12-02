import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

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
        <Card sx={{ maxWidth: 350, ml: 20, mt: 3 }}>
            <CardHeader title="Your Pantry:" />
            <CardContent>
                {pantry.map((ingredient) => {
                    return (
                        <Typography>{ingredient}</Typography>
                    );
                })}
            </CardContent>
        </Card>
    );
}