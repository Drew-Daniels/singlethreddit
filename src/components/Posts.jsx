import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Post from './Post/Post';

export default function Posts(props) {

    const { user, posts, comments, groupAvatarURLs, setSelectedGroup, groups } = props;
    return (
        <List>
            {posts.map((post, i) => {
                return (
                    <ListItem key={i}>
                        <Post 
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