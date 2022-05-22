import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';

export default function PostButton(props) {
    const { userAvatar } = props;
    const navigate = useNavigate();

    function handleClick() {
        navigate('submit')
    }

    return (
        <Grid component='a' container sx={{ border: '1px solid yellow', marginBottom: '1rem'}} onClick={handleClick}>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar src={userAvatar} alt='User Avatar'></Avatar>
            </Grid>
            <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center' }}>
                <Input placeholder='Create Post' />
            </Grid>
        </Grid>
    )
}