import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {default as UpvoteIcon} from '@mui/icons-material/ArrowCircleUp';
import {default as DownvoteIcon} from '@mui/icons-material/ArrowCircleDown';

export default function Votes(props) {

    const { numUpvotes, numDownvotes } = props;

    const [karma, setKarma] = useState(0);

    useEffect(() => {
        setKarma(prevKarma => numUpvotes - numDownvotes);

    }, [numUpvotes, numDownvotes])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'blue' }}>
            <Button>
                <UpvoteIcon />
            </Button>
            <span>{karma}</span>
            <Button>
                <DownvoteIcon />
            </Button>
        </Box>
    )
}