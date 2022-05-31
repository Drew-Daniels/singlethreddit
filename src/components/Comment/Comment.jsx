import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CommentHeader from './CommentHeader';
import CommentMain from './CommentMain';
import CommentFooter from './CommentFooter';

export default function Comment(props) {

    const { title, body, timeCreated } = props;

    return (
        <Grid container>
            {/* <Grid item xs={1} >

            </Grid>
            <Grid item xs={11}>
                <CommentHeader title={title} timeCreated={timeCreated} />
                <CommentMain body={body} />
                <CommentFooter />
            </Grid> */}
        </Grid>
    )
}