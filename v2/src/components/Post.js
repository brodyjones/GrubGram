import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

export default function Post({ post }) {
  return (
    <Card sx={{ maxWidth: 500, ml: 20, mt: 3 }}>
      <CardHeader
        title={post.name}
        subheader={post.timestamp}
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
}