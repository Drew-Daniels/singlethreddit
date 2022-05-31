import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Comment from './Comment/Comment';

export default function Comments(props) {
    
    const {comments} = props;

    return (
        <List>
            {comments.map((comment, i) => {
                return (
                    <ListItem key={i}>
                        <Comment {...comment}/>
                    </ListItem>
                )
            })}
        </List>
    )
}