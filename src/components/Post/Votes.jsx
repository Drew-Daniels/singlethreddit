import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {default as UpvoteIcon} from '@mui/icons-material/ArrowCircleUp';
import {default as DownvoteIcon} from '@mui/icons-material/ArrowCircleDown';

export default function Votes(props) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'blue' }}>
            <Button>
                <UpvoteIcon />
            </Button>
            <span>N</span>
            <Button>
                <DownvoteIcon />
            </Button>
        </Box>
    )
}