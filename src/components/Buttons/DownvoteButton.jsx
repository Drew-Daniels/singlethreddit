import Button from '@mui/material/Button';
import {default as DownvoteIcon} from '@mui/icons-material/ArrowCircleDown';

export default function DownvoteButton(props) {

    const { handleClick, color } = props;

    return (
        <Button onClick={handleClick} >
            <DownvoteIcon sx={{ color }}/>
        </Button>
    )
}