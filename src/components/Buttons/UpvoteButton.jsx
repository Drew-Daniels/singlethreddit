import Button from '@mui/material/Button';
import {default as UpvoteIcon} from '@mui/icons-material/ArrowCircleUp';

export default function UpvoteButton(props) {

    const { handleClick, color } = props;

    return (
        <Button onClick={handleClick} >
            <UpvoteIcon sx={{ color }} />
        </Button>
    )
}