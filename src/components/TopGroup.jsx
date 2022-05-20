import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function TopGroup(props) {

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem', fontSize: 12 }}>
            <span>N</span>
            <Avatar />
            <span>g/groupnamehere</span>
            <Button variant='contained'>Join</Button>
        </Box>
    )
}