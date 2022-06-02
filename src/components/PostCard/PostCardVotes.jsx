import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {default as UpvoteIcon} from '@mui/icons-material/ArrowCircleUp';
import {default as DownvoteIcon} from '@mui/icons-material/ArrowCircleDown';

export default function PostCardVotes(props) {

    const { user, upvoters, downvoters, karma, handleUpvote, handleDownvote } = props;

    const upvoteColor = user ? (upvoters.includes(user.uid) ? '#FF4301': 'gray') : 'gray'
    const downvoteColor = user ? (downvoters.includes(user.uid) ? '#FF4301': 'gray') : 'gray';

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