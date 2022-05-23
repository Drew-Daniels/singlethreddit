import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Post from './Post/Post';

export default function Feed(props) {

    const { user, posts } = props;

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu />
            <Post />
            <Post />
            <Post />
        </Container>
    )
}