import Box from '@mui/material/Box';
import LoadingCircle from './LoadingCircle';

export default function MainLoading(props) {

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoadingCircle />
        </Box>
    )
}