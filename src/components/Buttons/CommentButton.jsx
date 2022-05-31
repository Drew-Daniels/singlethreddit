import Button from '@mui/material/Button';
import {default as CommentIcon} from '@mui/icons-material/ChatBubbleOutline';

export default function CommentButton(props) {

    const { handleClick } = props;

    return (
        <Button onClick={handleClick} >
            <CommentIcon />
            <span>Reply</span>
        </Button>
    )
}