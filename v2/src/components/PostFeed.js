import Post from "./Post";

export default function PostFeed({ posts }) {
    return (
        <div>
            {posts.map((post) => {
                return (
                    <Post post={post} />
                );
            })}
        </div >
    );
}