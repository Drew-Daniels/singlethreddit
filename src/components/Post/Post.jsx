import Grid from '@mui/material/Grid';
import Votes from './Votes';

export default function Post(props) {

    return (
        <Grid container sx={{ marginBottom: '1rem'}}>
            <Grid item>
                <Votes />
            </Grid>
            <Grid item>
                {/* Post Data */}
            </Grid>
        </Grid>
    )
}