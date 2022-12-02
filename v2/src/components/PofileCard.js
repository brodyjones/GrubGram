import { Button, Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import IconButton from '@mui/material/IconButton';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

export default function ProfileCard() {
    const [userInfo, setUserInfo] = useState([]);
    const [user] = useAuthState(auth);
    const [image, setImage] = useState(null);

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
            <CardHeader title={userInfo.name}>
            </CardHeader>
            <CardMedia
                component="img"
                height="250"
                image={userInfo.profilePic}
            />
            <CardContent>
                <br></br>
                <br></br>
                <IconButton color="primary" aria-label="upload picture" component="label" onChange={(event) => {
                            setImage(event.target.files[0]);
                        }}>
                    <input hidden accept="image/*" type="file" />
                    <FileUploadRoundedIcon />
                </IconButton>
                <Button variant="contained" component="label" onClick={UploadProfile}>
                    Upload Image
                </Button>
                <br></br>
                <br></br>
            </CardContent>
        </Card>
    );
}