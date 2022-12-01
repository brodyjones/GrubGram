import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

function Post() {
  const [userPosts, setUserPosts] = useState([]);
  const userPostsRef = collection(db, "user posts");

  useEffect(() => {
    const getUserPosts = async () => {
      const data = await getDocs(userPostsRef);
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getUserPosts();
  }, [])

  return (
    <div>
      {userPosts.map((userPost) => {
        return (
          <Card sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
            <CardHeader
              title={userPost.username}
              subheader={userPost.datecreated}
            />
            <CardMedia
              component="img"
              height="250"
              image={userPost.imagelink}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {userPost.caption}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained">{userPost.recipe}</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default Post;