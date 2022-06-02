import { upvote, downvote } from '../../db/comments/comments';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PostCardHeader from './PostCardHeader';
import PostCardMain from './PostCardMain';
import PostCardFooter from './PostCardFooter';
import PostCardVotes from './PostCardVotes';

/**
 * Takes an array of comments and after counting the first level of comments, recursively counts the rest of the comments.
 */
function countComments(comments) {
    var numComments = comments.length;

    comments.forEach(subcomment => {
        numComments += countComments(subcomment.children);
    });
    return numComments;
}

export default function PostCard(props) {

    const { user, post, groupAvatarURL, handleClick } = props;
    const { id, baseName, userName, timeCreated, title, upvoters, downvoters, karma, children } = post;

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
                            handleUpvote={() => upvote(user, post)} 
                            handleDownvote={() => downvote(user, post)} 
                        />
                    </Grid>
                    <Grid item xs={10} onClick={handleClick ? handleClick: undefined}>
                        <PostCardHeader baseName={baseName} userName={userName} groupAvatarURL={groupAvatarURL} timeCreated={timeCreated} />
                        <PostCardMain title={title} />
                        <PostCardFooter numComments={countComments(post.children)} />
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )

    return (
        <Card sx={{ marginBottom: '1rem' }}>{card}</Card>
    )
}