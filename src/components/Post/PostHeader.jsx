import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function PostHeader(props) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar />
            <Typography sx={{ fontSize: 12 }}>g/groupNameHere</Typography>
            {/* Posted by user name n (time ago) */}
            <Typography sx={{ fontSize: 12 }}>posted by u/usernamehere</Typography>
            <Typography sx={{ fontSize: 12 }}>x time ago</Typography>
        </Box>
    )
}