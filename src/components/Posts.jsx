import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PostCard from './PostCard/PostCard';

export default function Posts(props) {

    const { user, posts, groupAvatarURLs, setSelectedGroup, groups } = props;
    
    const navigate = useNavigate();

    function viewPost(post) {
        const {baseName, id} = post;
        selectGroup(baseName);
        goToPost(post);
    }

    function selectGroup(baseName) {
        const group = groups.filter(group => group.baseName === baseName)[0];
        setSelectedGroup(prev => group);
    }

    function goToPost(post) {
        navigate(`g/${post.baseName}/${post.id}`);
    }

    return (
        <List>
            {posts.map((post, i) => {
                return (
                    <ListItem key={i}>
                        <PostCard 
                            user={user} 
                            post={post} 
                            groupAvatarURL={groupAvatarURLs[post.baseName]} 
                            handleClick={() => viewPost(post)}
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}