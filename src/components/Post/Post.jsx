import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import Votes from './Votes';

export default function Post(props) {

    const card = (
        <>
            <CardContent>
                <Grid container>
                    <Grid item xs={2}>
                        <Votes />
                    </Grid>
                    <Grid item>
                        <PostHeader />
                        <PostFooter />
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )

    return (
        <Card variant='outlined' sx={{ marginBottom: '1rem' }}>{card}</Card>
    )
}