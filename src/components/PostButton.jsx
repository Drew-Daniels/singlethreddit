import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

export default function PostButton(props) {
    const { userAvatar } = props;
    const navigate = useNavigate();

    function handleClick() {
        navigate('submit')
    }

    return (
        <Grid container sx={{ border: '1px solid yellow', marginBottom: '1rem'}} onClick={handleClick}>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar src={userAvatar} alt='User Avatar'></Avatar>
            </Grid>
            <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField fullWidth label="Create Post" />
            </Grid>
        </Grid>
    )
}