import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ProfileFeed() {
    const [userPosts, setUserPosts] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if(user) return;
        const getUserPosts = async () => {
            const docRef = doc(db, "users", user?.uid);
            const docSnap = await getDoc(docRef);
            const uPosts = docSnap.data().posts;
            const ret = [];
            uPosts.map(async (post) => {
                const postsDocRef = doc(db, "posts", post);
                const postsDocSnap = await getDoc(postsDocRef);
                ret.push(postsDocSnap.data());
            });
            setUserPosts(ret);
        }

        getUserPosts();
    }, [user]);
    
    return (
        <div>
            {userPosts.map((post) => {
                return (
                    <Card sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
                        <CardHeader
                            title={post.name}
                            //subheader={post.id}
                        />
                        <CardMedia
                            component="img"
                            height="250"
                            image={post.image}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {post.caption}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained">{post.recipe}</Button>
                        </CardActions>
                    </Card>
                );
            })}
        </div>
    );
}