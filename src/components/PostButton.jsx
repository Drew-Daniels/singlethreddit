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
        <Grid container sx={{ border: '1px solid yellow', marginBottom: '1rem'}} onClick={ handleClick }>
            <Grid item>
                <Avatar src={userAvatar} alt='User Avatar'></Avatar>
            </Grid>
            <Grid item>
                <TextField fullWidth label="Create Post" disabled />
            </Grid>
        </Grid>
    )
}