import Box from '@mui/material/Box';

export default function Rule(props) {

    const { number, text } = props;

    return (
        <Box sx={{  }}>
            <span>{number}</span>
            <span>{text}</span>
        </Box>        
    )
}
