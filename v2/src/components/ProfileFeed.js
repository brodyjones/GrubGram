import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ProfileFeed() {
    const [userPosts, setUserPosts] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getUserPosts = async () => {
            const docRef = doc(db, "users", user?.uid);
            const docSnap = await getDoc(docRef);
            setUserPosts(docSnap.data().posts);
        }

        getUserPosts();
    }, [user]);

    return (
        <div>
            {userPosts.map(async (post) => {
                const postsDocRef = doc(db, "posts", post);
                const postsDocSnap = await getDoc(postsDocRef);
                return (
                    <Card sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
                        <CardHeader
                            title={postsDocSnap.data().name}
                            subheader={postsDocSnap.data().id}
                        />
                        <CardMedia
                            component="img"
                            height="250"
                            image={postsDocSnap.data().image}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {postsDocSnap.data().caption}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained">{postsDocSnap.data().recipe}</Button>
                        </CardActions>
                    </Card>
                );
            })}
        </div>
    );
}