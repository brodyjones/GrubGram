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
import {db} from '../firebase'

function Post() {
    var index = 0; // need to find a way to loop through all post indexes

    const [userPosts, setUserPosts] = useState([]);
    const userPostsRef = collection(db, "user posts");

    useEffect(() => {
        const getUserPosts = async () => {
          const data = await getDocs(userPostsRef);
          setUserPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
    
        getUserPosts()
    }, [])

    return (
        <Card sx={{ maxWidth: 500, ml: 25, mt: 3 }}>
        <CardHeader
          title={userPosts[index].username}
          subheader={userPosts[index].datecreated}
        />
        <CardMedia
          component="img"
          height="250"
          image={userPosts[index].imagelink}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {userPosts[index].caption}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>{userPosts[index].recipe}</Button>
        </CardActions>
      </Card>
    );
}

export default Post;