import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {default as CommentsIcon} from '@mui/icons-material/ChatBubbleOutline';

export default function PostCardFooter(props) {

    const { numComments } = props;

    return (
        <CardActions>
            <Button variant='outlined'>
                <CommentsIcon />
                <span>{numComments === 1 ? numComments + ' comment': numComments + ' comments'}</span>
            </Button>
        </CardActions>
    )
}