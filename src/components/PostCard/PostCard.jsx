import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { upvote, downvote } from '../../db/comments/comments';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostCardHeader from './PostCardHeader';
import PostCardMain from './PostCardMain';
import PostCardFooter from './PostCardFooter';
import PostCardVotes from './PostCardVotes';

export default function PostCard(props) {

    const { user, post, groupAvatarURL, setComments, setSelectedGroup, groups } = props;
    const { id, baseName, userName, timeCreated, title, upvoters, downvoters, karma } = post;

    const navigate = useNavigate();
    const [postComments, setPostComments] = useState([]);

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
                        <PostCardVotes 
                            user={user} 
                            upvoters={upvoters} 
                            downvoters={downvoters} 
                            karma={karma} 
                            setComments={setComments} 
                            handleUpvote={() => upvote(user, post)} 
                            handleDownvote={() => downvote(user, post)} 
                        />
                    </Grid>
                    <Grid item xs={10} onClick={handleClick}>
                        <PostCardHeader baseName={baseName} userName={userName} groupAvatarURL={groupAvatarURL} timeCreated={timeCreated} />
                        <PostCardMain title={title} />
                        <PostCardFooter numComments={postComments.length} />
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )

    return (
        <Card sx={{ marginBottom: '1rem' }}>{card}</Card>
    )
}