import UserContext from '../contexts/UserContext';
import { useEffect, useState, useContext } from 'react';
import { getPosts } from '../db/comments/comments';
import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Posts from './Posts';
import GroupAvatarsContext from '../contexts/GroupAvatarsContext';

export default function PostsFeed(props) {

    const {
      comments, 
      addComment,
      sortHot, 
      sortMostRecent
    } = props;
    const [posts, setPosts] = useState([]);

    const user = useContext(UserContext);
    const groupAvatarURLs = useContext(GroupAvatarsContext);

    useEffect(() => {
      loadPosts();

      function loadPosts(cb) {
          try {
            const ps = getPosts(comments);
            setPosts(ps);
          }
          catch (err) {
            console.error(err);
          }
        }
    }, [comments]);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu 
                sortHot={sortHot}
                sortMostRecent={sortMostRecent}
            />
            <Posts user={user} posts={posts} comments={comments} addComment={addComment} groupAvatarURLs={groupAvatarURLs} />
        </Container>
    )
}