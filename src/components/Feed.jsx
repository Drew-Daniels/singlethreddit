import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Posts from './Posts';

export default function Feed(props) {

    const { user, posts, setComments, comments, sortHot, sortMostRecent } = props;



    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu 
                sortHot={sortHot}
                sortMostRecent={sortMostRecent}
            />
            <Posts posts={posts} comments={comments} />
        </Container>
    )
}