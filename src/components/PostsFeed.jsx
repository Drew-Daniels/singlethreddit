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
      sortMostRecent,
      setSelectedGroup,
      groups,
    } = props;
    
    const posts = comments.filter(comment => comment.parentId === '');
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
              comments={comments} 
              addComment={addComment} 
              groupAvatarURLs={groupAvatarURLs} 
              setSelectedGroup={setSelectedGroup}
              groups={groups}
            />
        </Container>
    )
}