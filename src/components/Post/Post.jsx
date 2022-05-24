import { useEffect, useState } from 'react';
import { getPostComments } from '../../db/comments/comments';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostHeader from './PostHeader';
import PostMain from './PostMain';
import PostFooter from './PostFooter';
import Votes from './Votes';

export default function Post(props) {

    const { id, baseName, userName, groupAvatarURL, timeCreated, title, numUpvotes, numDownvotes } = props.post;
    const { comments } = props;
    
    const [postComments, setPostComments] = useState([]);

    useEffect(() => {
        loadPostComments();

        function loadPostComments() {
            const pc = getPostComments(id, comments);
            setPostComments(pc);
        }
    }, [id, comments])

    const card = (
        <>
            <CardContent id={id} >
                <Grid container>
                    <Grid item xs={2}>
                        <Votes numUpvotes={numUpvotes} numDownvotes={numDownvotes} />
                    </Grid>
                    <Grid item>
                        <PostHeader baseName={baseName} userName={userName} groupAvatarURL={groupAvatarURL} timeCreated={timeCreated} />
                        <PostMain title={title} numUpvotes={numUpvotes} numDownvotes={numDownvotes} />
                        <PostFooter numComments={postComments.length} />
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )

    return (
        <Card variant='outlined' sx={{ marginBottom: '1rem' }}>{card}</Card>
    )
}