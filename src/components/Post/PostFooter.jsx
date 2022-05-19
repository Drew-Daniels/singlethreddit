import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {default as CommentsIcon} from '@mui/icons-material/ChatBubbleOutline';

export default function PostFooter(props) {

    return (
        <CardActions>
            <Button variant='outlined'>
                <CommentsIcon />
                <span>N Comments</span>
            </Button>
        </CardActions>
    )
}