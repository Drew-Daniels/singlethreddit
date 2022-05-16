import Grid from '@mui/material/Grid';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';

export default function HomePage(props) {

    return (
        <Grid container spacing={2} sx={{ marginTop: '1rem'}}>
            <Grid item md={2}/>
            <Grid item xs={12} sm={9} md={5}>
                <div id='firebaseui-auth-container'></div>
                <Feed />
            </Grid>
            <Grid item sm={0} md={3}>
                <Sidebar />
            </Grid>
            <Grid item md={2} />
        </Grid>
    )
}
