import { Card, CardHeader, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfileCard() {
    const [userInfo, setUserInfo] = useState([]);
    const [user] = useAuthState(auth);
    
    useEffect(() => {
        const getUserInfo = async () => {
            const userRef = doc(db, "users", user?.uid);
            const userSnap = await getDoc(userRef);
            setUserInfo(userSnap.data());
        }

        getUserInfo();
    }, [user]);

    return (
        <Card sx={{ maxWidth: 300, ml: 20, mt: 3 }}>
            <CardHeader 
                title={userInfo.name}
            />
            <CardMedia
                component="img"
                height="250"
                image="" //kriteen make this work as {userInfo.image}
            />
        </Card>
    );
}