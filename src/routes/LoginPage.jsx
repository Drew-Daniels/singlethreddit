import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginBannerImage from '../images/login-banner-image.jpg';
export default function LoginPage(props) {

    return (
        <Grid container>
            <Grid item xs={2} sx={{ backgroundImage: `url(${LoginBannerImage})`, backgroundFit: 'contain' }} />
            <Grid item xs={4}>
                Login Form here
            </Grid>
        </Grid>        
    )
}