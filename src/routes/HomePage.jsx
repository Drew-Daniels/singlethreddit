import Grid from '@mui/material/Grid';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import { useOutletContext } from 'react-router-dom';

export default function HomePage(props) {

    const { userAvatar } = useOutletContext();

    return (
        <Grid container spacing={2} sx={{ marginTop: '1rem'}}>
            <Grid item md={2}/>
            <Grid item xs={12} sm={9} md={5}>
                <Feed userAvatar={userAvatar} />
            </Grid>
            <Grid item sm={0} md={3}>
                <Sidebar />
            </Grid>
            <Grid item md={2} />
        </Grid>
    )
}
