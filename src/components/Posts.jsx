import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Post from './Post/Post';

export default function Posts(props) {

    const { posts, comments } = props;

    return (
        <List>
            {posts.map((post, i) => {
                return (
                    <ListItem key={i}>
                        <Post post={post} comments={comments} />
                    </ListItem>
                )
            })}
        </List>
    )
}