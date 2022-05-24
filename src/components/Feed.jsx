import { getPostComments } from '../db/comments/comments';
import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Posts from './Posts';

export default function Feed(props) {

    const { user, posts, setPosts, comments } = props;

    function sortHot(posts) {
        console.log(posts);
        var newOrder = [...posts].sort(compareHot);
        console.log(newOrder);
        return newOrder;

        function compareHot(a, b) {
            return (b.numUpvotes - b.numDownvotes) - (a.numUpvotes - a.numDownvotes);
        }
    }

    function sortMostRecent(posts) {
        console.log(posts);
        var newOrder = [...posts].sort(compareMostRecent);
        console.log(newOrder);
        return newOrder;

        function compareMostRecent(a, b) {
            return b.timeCreated - a.timeCreated;
        }
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu handleSortHot={() => setPosts(prevPosts => sortHot(posts))} handleSortMostRecent={() => setPosts(prevPosts => sortMostRecent(posts))} />
            <Posts posts={posts} comments={comments} />
        </Container>
    )
}