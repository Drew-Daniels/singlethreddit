import { getPostComments } from '../db/comments/comments';
import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Post from './Post/Post';

export default function Feed(props) {

    const { user, posts, setPosts, comments } = props;

    function sortHot(posts) {
        var newOrder = posts.sort(compareHot);
        return setPosts(newOrder);

        function compareHot(postA, postB) {
            const postAKarma = postA.numUpvotes - postA.numDownvotes;
            const postBKarma = postB.numUpvotes - postB.numDownvotes;
            // if postB has more karma than postA, show it before postA
            return postBKarma - postAKarma;
        }
    }

    function sortMostRecent(posts) {
        var newOrder = posts.sort(compareMostRecent);
        return setPosts(newOrder);

        function compareMostRecent(postA, postB) {
            return postA.timeCreated - postB.timeCreated;
        }
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu handleSortHot={() => sortHot(posts)} handleSortMostRecent={() => sortMostRecent(posts)} />
            {posts.map((post, i) => {
                const postComments = getPostComments(post.id, comments);
                return <Post key={i} post={post} comments={postComments} />
            })}
        </Container>
    )
}