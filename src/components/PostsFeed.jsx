import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import Container from '@mui/material/Container';
import PostButton from './Buttons/PostButton';
import SortMenu from './SortMenu';
import Posts from './Posts';
import GroupAvatarsContext from '../contexts/GroupAvatarsContext';

export default function PostsFeed(props) {

    const {
      groups,
      setSelectedGroup,
      posts, 
      setSelectedPost,
      sortHot, 
      sortMostRecent,
    } = props;

    const user = useContext(UserContext);
    const groupAvatarURLs = useContext(GroupAvatarsContext);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            <PostButton userAvatar={user ? user.photoURL: ''} />
            <SortMenu 
                sortHot={sortHot}
                sortMostRecent={sortMostRecent}
            />
            <Posts 
              user={user} 
              posts={posts} 
              setSelectedPost={setSelectedPost}
              groupAvatarURLs={groupAvatarURLs} 
              setSelectedGroup={setSelectedGroup}
              groups={groups}
            />
        </Container>
    )
}