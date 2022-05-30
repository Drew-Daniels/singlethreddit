import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Posts from './Posts';

export default function Feed(props) {

    const { 
      user, 
      comments, 
      addComment,
      groupAvatarURLs, 
      getPosts,
      sortHot, 
      sortMostRecent 
    } = props;

    const [posts, setPosts] = useState([]);

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
    }, [getPosts, comments]);

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