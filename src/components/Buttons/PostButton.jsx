import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';

export default function PostButton(props) {
    const { userAvatar } = props;

    return (
        <Link component={RouterLink} to='submit'>
            <Grid component='a' container sx={{ border: '1px solid yellow', marginBottom: '1rem'}}>
                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar src={userAvatar} alt='User Avatar'></Avatar>
                </Grid>
                <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Input placeholder='Create Post' />
                </Grid>
            </Grid>
        </Link>
    )
}