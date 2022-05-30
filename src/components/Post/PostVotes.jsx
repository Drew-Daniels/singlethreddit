import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {default as UpvoteIcon} from '@mui/icons-material/ArrowCircleUp';
import {default as DownvoteIcon} from '@mui/icons-material/ArrowCircleDown';

export default function PostVotes(props) {

    const { post, handleUpvote, handleDownvote } = props;
    const [karma, setKarma] = useState(0);

    useEffect(() => {
        setKarma(prevKarma => post.upvoters.length - post.downvoters.length);

    }, [post])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button onClick={handleUpvote}>
                <UpvoteIcon />
            </Button>
            <span>{karma}</span>
            <Button onClick={handleDownvote} >
                <DownvoteIcon />
            </Button>
        </Box>
    )
}