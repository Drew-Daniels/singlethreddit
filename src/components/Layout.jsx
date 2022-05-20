import Grid from '@mui/material/Grid';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';

export default function Layout(props) {

    const { mainComponent, sidebarComponent } = props;

    return (
        <Grid container spacing={2} sx={{ marginTop: '1rem'}}>
            <Grid item md={2}/>
            <Grid item xs={12} sm={9} md={5}>
                <Main children={mainComponent} />
            </Grid>
            <Grid item sm={0} md={3}>
                <Sidebar children={sidebarComponent}/>
            </Grid>
            <Grid item md={2} />
        </Grid>
    )
}
