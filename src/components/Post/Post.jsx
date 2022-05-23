import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostHeader from './PostHeader';
import PostMain from './PostMain';
import PostFooter from './PostFooter';
import Votes from './Votes';

export default function Post(props) {

    const { id, baseName, userName, timeCreated, title, upvotes, downvotes } = props.post;

    // TODO: Retrieve total number of comments under this post
    var numComments = 0;

    const card = (
        <>
            <CardContent id={id} >
                <Grid container>
                    <Grid item xs={2}>
                        <Votes upvotes={upvotes} downvotes={downvotes} />
                    </Grid>
                    <Grid item>
                        <PostHeader baseName={baseName} userName={userName} timeCreated={timeCreated} />
                        <PostMain title={title} upvotes={upvotes} downvotes={downvotes} />
                        <PostFooter numComments={numComments} />
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )

    return (
        <Card variant='outlined' sx={{ marginBottom: '1rem' }}>{card}</Card>
    )
}