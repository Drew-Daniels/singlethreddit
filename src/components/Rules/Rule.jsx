import Box from '@mui/material/Box';

export default function Rule(props) {

    const { number, description } = props;

    return (
        <Box>
            <span>{number}</span>
            <span>{description}</span>
        </Box>        
    )
}
