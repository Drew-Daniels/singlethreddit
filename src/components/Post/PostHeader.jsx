import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function PostHeader(props) {

    const { baseName, userName, timeCreated } = props;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar />
            <Typography sx={{ fontSize: 12 }}>{'g/' + baseName}</Typography>
            <Typography sx={{ fontSize: 12 }}>posted by u/{userName}</Typography>
            <Typography sx={{ fontSize: 12 }}>at {String(timeCreated.toDate())} </Typography>
        </Box>
    )
}