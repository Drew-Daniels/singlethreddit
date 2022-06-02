import Button from '@mui/material/Button';
import {default as UpvoteIcon} from '@mui/icons-material/ArrowCircleUp';

export default function UpvoteButton(props) {

    const { handleClick } = props;

    return (
        <Button onClick={handleClick} >
            <UpvoteIcon />
        </Button>
    )
}