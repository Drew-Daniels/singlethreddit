import Box from '@mui/material/Box';
import {default as RulesIcon} from '@mui/icons-material/Edit';

export default function RulesHeader(props) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RulesIcon />
            <h1>Posting to Singlethreddit</h1>
        </Box>
        
    )
}