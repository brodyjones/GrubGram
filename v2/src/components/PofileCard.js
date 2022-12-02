import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, createTheme, Grid, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import IconButton from '@mui/material/IconButton';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
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
        <ThemeProvider theme={theme}>
            <Card raised={true} sx={{ maxWidth: 275, ml: 20, mt: 3 }}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <CardHeader
                        title={userInfo.name}
                        titleTypographyProps={{
                            fontSize: 26, color: red[600], fontFamily: 'monospace', fontWeight: 'bold'
                        }}
                    />
                    <Avatar
                        sx={{ height: 200, width: 200 }}
                        src={userInfo.profilePic}
                    />
                </Grid>
                <CardContent>
                    <IconButton sx={{ color: red[500] }} aria-label="upload picture" component="label" onChange={(event) => {
                        setImage(event.target.files[0]);
                    }}>
                        <input hidden accept="image/*" type="file" />
                        <FileUploadRoundedIcon />
                    </IconButton>
                    <Button sx={{ bgcolor: red[600] }} variant="contained" component="label" onClick={UploadProfile}>
                        Update Profile Pic
                    </Button>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}