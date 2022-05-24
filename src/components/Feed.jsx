import { getPostComments } from '../db/comments/comments';
import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Post from './Post/Post';

export default function Feed(props) {

    const { user, posts, comments } = props;

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu />
            {posts.map((post, i) => {
                const postComments = getPostComments(post.id, comments);
                return <Post key={i} post={post} comments={postComments} />
            })}
        </Container>
    )
}