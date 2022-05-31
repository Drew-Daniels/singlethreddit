import Box from '@mui/material/Box';

export default function PostMain(props) {

    const { title } = props;

    return (
        <Box>
            <h2>{title}</h2>
        </Box>
    )
}