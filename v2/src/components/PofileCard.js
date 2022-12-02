import { Button, Card, CardContent, CardHeader, CardMedia, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ProfileCard() {
    const [userInfo, setUserInfo] = useState([]);
    const [user] = useAuthState(auth);
    const [image, setImage] = useState(null);
    const [imageLink, setImageLink] = useState("");

    useEffect(() => {
        const getUserInfo = async () => {
            const userRef = doc(db, "users", user?.uid);
            const userSnap = await getDoc(userRef);
            setUserInfo(userSnap.data());
        }

        getUserInfo();
    }, [user]);

    const UploadProfile = async () => {
        if (!image) return;
        const imageRef = ref(storage, `images/${image.name}`);
        uploadBytes(imageRef, image);
        getDownloadURL(ref(storage, `images/${image.name}`))
            .then((url) => {
                setImageLink(url);
                updateUserLink(url);
            })
    }

    const updateUserLink = async (ProfileLink) => {
        const docRef = doc(db, "users", user?.uid);
        await updateDoc(docRef, { profilePic: ProfileLink });
        window.location.reload(false);
    }



    return (
        <Card sx={{ maxWidth: 300, ml: 20, mt: 3 }}>
            <CardMedia
                component="img"
                height="250"
                image={userInfo.profilePic}
            />
            <CardContent>
                <TextField type={"file"} variant="filled" size="small"
                    sx={{ mt: 1, mb: 1, width: 267 }}
                    id="filled-basic"
                    onChange={(event) => {
                        setImage(event.target.files[0]);
                    }}
                />
                <br></br>
                <br></br>
                <Button variant="contained" onClick={UploadProfile}>Update Profile Picture</Button>

            </CardContent>
        </Card>
    );
}