import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { upvote, downvote } from '../../db/comments/comments';
import { findAndRemoveFromArray } from '../../utils/arrays/arrays';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostHeader from './PostHeader';
import PostMain from './PostMain';
import PostFooter from './PostFooter';
import PostVotes from './PostVotes';

export default function Post(props) {

    const { user, post, groupAvatarURL, comments, setComments } = props;
    const { id, baseName, userName, timeCreated, title, upvoters, downvoters } = post;
    
    const navigate = useNavigate();
    const [postComments, setPostComments] = useState([]);
    const [numUpvoters, setNumUpvoters] = useState(0);
    const [numDownvoters, setNumDownvoters] = useState(0);

    useEffect(() => {
        setNumUpvoters(upvoters.length);
    }, [upvoters]);

    useEffect(() => {
        setNumDownvoters(downvoters.length);
    }, [downvoters]);

    function goToPost() {
        navigate(`${baseName}/${id}`)
    }

    // useEffect(() => {
    //     loadPostComments();

    //     function loadPostComments() {
    //         const pc = getPostComments(id, comments);
    //         setPostComments(pc);
    //     }
    // }, [id, comments])

    const card = (
        <>
            <CardContent id={id} >
                <Grid container>
                    <Grid item xs={2}>
                        <PostVotes post={post} setComments={setComments} handleUpvote={() => upvote(user, post)} handleDownvote={() => downvote(user, post)} />
                    </Grid>
                    <Grid item onClick={() => navigate(`g/${baseName}/${id}`)}>
                        <PostHeader baseName={baseName} userName={userName} groupAvatarURL={groupAvatarURL} timeCreated={timeCreated} />
                        <PostMain title={title} numUpvotes={numUpvoters} numDownvotes={numDownvoters} />
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