import Box from '@mui/material/Box';
import {default as UpvoteIcon} from '@mui/icons-material/ArrowCircleUp';
import {default as DownvoteIcon} from '@mui/icons-material/ArrowCircleDown';

export default function Votes(props) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'blue' }}>
            <UpvoteIcon />
            <span>N</span>
            <DownvoteIcon />
        </Box>
    )
}