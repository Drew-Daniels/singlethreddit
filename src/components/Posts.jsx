import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PostCard from './PostCard/PostCard';

export default function Posts(props) {

    const { user, posts, comments, groupAvatarURLs, setSelectedGroup, groups } = props;
    return (
        <List>
            {posts.map((post, i) => {
                return (
                    <ListItem key={i}>
                        <PostCard 
                            user={user} 
                            post={post} 
                            comments={comments} 
                            groupAvatarURL={groupAvatarURLs[post.baseName]} 
                            setSelectedGroup={setSelectedGroup}
                            groups={groups}
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}