import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// Banner Image credit: https://unsplash.com/@alex_andrews
import LoginBannerImage from '../images/login-banner-image.jpg';
export default function LoginPage(props) {

    const handleLogin = async () => {
         
    }

    return (
        <Grid container>
            <Grid item xs={2} sx={{ backgroundImage: `url(${LoginBannerImage})`, backgroundFit: 'contain' }} />
            <Grid item xs={4}>
                <button>Log in with Google</button>
            </Grid>
        </Grid>        
    )
}