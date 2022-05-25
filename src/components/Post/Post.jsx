import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostComments } from '../../db/comments/comments';
import { findAndRemoveFromArray } from '../../utils/arrays/arrays';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostHeader from './PostHeader';
import PostMain from './PostMain';
import PostFooter from './PostFooter';
import PostVotes from './PostVotes';

export default function Post(props) {

    const { user, post, comments, setComments } = props;
    const { id, baseName, userName, groupAvatarURL, timeCreated, title, upvoters, downvoters } = post;
    
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

    function upvote() {
        // if (upvoters.includes(uid)) {
        //     const newUpvoters = findAndRemoveFromArray(uid, upvoters);
        //     // update comments

        // } else {
        //     const newUpvoters = [...upvoters];
        //     newUpvoters.push(uid);
        // }
        console.log('Complete later');
    }

    function downvote() {
        // if (downvoters.includes(uid)) {
        //     const newDownvoters = findAndRemoveFromArray(uid, downvoters);
        //     // update comments
        //     const newComments = findAndRemoveFromArray(post, comments);
        //     const newComment = {...post};
        //     newComment.downvoters
        // } else {
        //     const newDownvoters = [...downvoters];
        //     newDownvoters.push(uid);
        // }
        console.log('Complete later')
    }

    function goToPost() {
        navigate(`${baseName}/${id}`)
    }

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