import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { upvote, downvote } from '../../db/comments/comments';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostHeader from './PostHeader';
import PostMain from './PostMain';
import PostFooter from './PostFooter';
import PostVotes from './PostVotes';

export default function Post(props) {

    const { user, post, groupAvatarURL, setComments, setSelectedGroup, groups } = props;
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

    function handleClick() {
        const group = groups.filter(group => group.baseName === baseName)[0];
        setSelectedGroup(prev => group);
        navigate(`g/${baseName}/${id}`);
    }

    const card = (
        <>
            <CardContent id={id} >
                <Grid container>
                    <Grid item xs={2}>
                        <PostVotes user={user} post={post} setComments={setComments} handleUpvote={() => upvote(user, post)} handleDownvote={() => downvote(user, post)} />
                    </Grid>
                    <Grid item xs={10} onClick={handleClick}>
                        <PostHeader baseName={baseName} userName={userName} groupAvatarURL={groupAvatarURL} timeCreated={timeCreated} />
                        <PostMain title={title} />
                        <PostFooter numComments={postComments.length} />
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )

    return (
        <Card sx={{ marginBottom: '1rem' }}>{card}</Card>
    )
}