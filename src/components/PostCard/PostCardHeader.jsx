import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { getTimeSince } from '../../utils/time/time';

export default function PostCardHeader(props) {

    const { baseName, userName, uid, groupAvatarURL, timeCreated } = props;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={groupAvatarURL} />
            <Typography sx={{ fontSize: 12 }}>{'g/' + baseName}</Typography>
            <Typography sx={{ fontSize: 12, marginRight: '.25rem' }}>
                posted by u/
                <Link
                    component={RouterLink}
                    to={'/u/' + uid}
                >
                    {userName}
                </Link>
            </Typography>
            <Typography sx={{ fontSize: 12 }}>{getTimeSince(timeCreated.toDate())}</Typography>
        </Box>
    )
}