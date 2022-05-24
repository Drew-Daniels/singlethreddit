import { useEffect, useState } from 'react';
import { getPostComments } from '../../db/comments/comments';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostHeader from './PostHeader';
import PostMain from './PostMain';
import PostFooter from './PostFooter';
import PostVotes from './PostVotes';

export default function Post(props) {

    const { post, comments, setComments } = props;
    const { id, baseName, userName, groupAvatarURL, timeCreated, title, numUpvotes, numDownvotes } = post;
    
    const [postComments, setPostComments] = useState([]);
    // -1 => downvote
    // 0 => no vote
    // 1 => upvote
    const [vote, setVote] = useState(0);

    function upvote() {
        if (vote <= 0) {
            // user has either not voted or downvoted - either way change vote to upvoted
            setVote(1);
        } else {
            // user has already voted - change to neutral
            setVote(0);
        }
    }

    function downvote() {
        // user has already downvoted - change to neutral
        if (vote < 0) {
            setVote(0);
        } else {
            // user has either not voted or downvoted - either way change vote to downvoted
            setVote(-1);
        }
    }

    useEffect(() => {
        // make a copy of the post
        // make a copy of comments
        console.log(vote);
    }, [vote])

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
                        <PostVotes post={post} setComments={setComments} handleUpvote={upvote} handleDownvote={downvote} />
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