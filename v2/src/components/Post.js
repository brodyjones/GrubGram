import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';

export default function Post() {
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPosts((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).reverse());
    }

    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return (
          <Card sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
            <CardHeader
              title={post.name}
              subheader={post.id}
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