import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {default as UpvoteIcon} from '@mui/icons-material/ArrowCircleUp';
import {default as DownvoteIcon} from '@mui/icons-material/ArrowCircleDown';

export default function PostVotes(props) {

    const { user, post, handleUpvote, handleDownvote } = props;
    const {upvoters, downvoters} = post;
    const [karma, setKarma] = useState(0);

    const upvoteColor = user ? (upvoters.includes(user.uid) ? '#FF4301': 'gray') : 'gray'
    const downvoteColor = user ? (downvoters.includes(user.uid) ? '#FF4301': 'gray') : 'gray';

    useEffect(() => {
        setKarma(prevKarma => post.upvoters.length - post.downvoters.length);
    }, [post])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button onClick={handleUpvote}>
                <UpvoteIcon sx={{ color: upvoteColor }} />
            </Button>
            <span>{karma}</span>
            <Button onClick={handleDownvote} >
                <DownvoteIcon sx={{ color: downvoteColor }} />
            </Button>
        </Box>
    )
}