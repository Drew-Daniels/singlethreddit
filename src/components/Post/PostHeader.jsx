import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getTimeSince } from '../../utils/time/time';

export default function PostHeader(props) {

    const { baseName, userName, groupAvatarURL, timeCreated } = props;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={groupAvatarURL} />
            <Typography sx={{ fontSize: 12 }}>{'g/' + baseName}</Typography>
            <Typography sx={{ fontSize: 12 }}>posted by u/{userName}</Typography>
            <Typography sx={{ fontSize: 12 }}>at {getTimeSince(timeCreated.toDate())} </Typography>
        </Box>
    )
}