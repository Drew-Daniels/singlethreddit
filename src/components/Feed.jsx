import { useEffect, useState } from 'react';
import { getAllPosts } from '../db/comments/comments';
import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Posts from './Posts';

export default function Feed(props) {

    const { user, comments, setComments, sortHot, sortMostRecent } = props;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();

        async function loadPosts(cb) {
            try {
              const ps = await getAllPosts(comments);
              setPosts(ps);
            }
            catch (err) {
              console.error(err);
            }
          }
    }, [comments]);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid red' }}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu 
                sortHot={sortHot}
                sortMostRecent={sortMostRecent}
            />
            <Posts posts={posts} comments={comments} setComments={setComments} />
        </Container>
    )
}