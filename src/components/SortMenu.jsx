import Grid from '@mui/material/Grid';
import {default as MostRecentIcon} from '@mui/icons-material/AccessTime';
import {default as HotIcon} from '@mui/icons-material/Whatshot';

export default function SortMenu(props) {

    return (
        <Grid container sx={{ border: '1px solid green' }}>
            <Grid item>
                <HotIcon />
                <span>Hot</span>
            </Grid>
            <Grid item>
                <MostRecentIcon />
                <span>New</span>
            </Grid>
        </Grid>
    )
}