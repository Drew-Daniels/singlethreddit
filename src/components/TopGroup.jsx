import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function TopGroup(props) {

    return (
        <Grid container>
            <Grid item xs={1}>
                <span>N</span>
            </Grid>
            <Grid item xs={2}>
                <Avatar />
            </Grid>
            <Grid item>
                <span>g/groupnamehere</span>
            </Grid>
            <Grid item xs={3}>
                <Button variant='contained'>Join</Button>
            </Grid>
        </Grid>
    )
}