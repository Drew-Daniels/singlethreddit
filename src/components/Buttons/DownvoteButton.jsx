import Button from '@mui/material/Button';
import {default as DownvoteIcon} from '@mui/icons-material/ArrowCircleDown';

export default function DownvoteButton(props) {

    const { handleClick } = props;

    return (
        <Button onClick={handleClick} >
            <DownvoteIcon />
        </Button>
    )
}