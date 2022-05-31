import Button from '@mui/material/Button';
import {default as CommentIcon} from '@mui/icons-material/ChatBubbleOutline';

export default function CommentButton(props) {

    return (
        <Button>
            <CommentIcon />
            <span>Reply</span>
        </Button>
    )
}