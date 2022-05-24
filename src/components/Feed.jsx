import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Posts from './Posts';

export default function Feed(props) {

    const { user, posts, setPosts, comments } = props;

    function sortHot(posts) {
        var newOrder = [...posts].sort(compareHot);
        setPosts(prevOrder => newOrder);

        function compareHot(a, b) {
            return (b.getKarma()) - (a.getKarma());
        }
    }

    function sortMostRecent(posts) {
        var newOrder = [...posts].sort(compareMostRecent);
        setPosts(prevOrder => newOrder);

        function compareMostRecent(a, b) {
            return b.timeCreated - a.timeCreated;
        }
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu 
                handleSortHot={() => sortHot(posts)} 
                handleSortMostRecent={() => sortMostRecent(posts)} 
            />
            <Posts posts={posts} comments={comments} />
        </Container>
    )
}