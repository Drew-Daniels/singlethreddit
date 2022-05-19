import Box from '@mui/material/Box';
import TopGroup from './TopGroup';

export default function TopGroups(props) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TopGroup />
            <TopGroup />
            <TopGroup />
            <TopGroup />
            <TopGroup />
        </Box>
    )
}