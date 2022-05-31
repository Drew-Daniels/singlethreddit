import Box from '@mui/material/Box';

export default function PostMain(props) {

    const { title } = props;

    return (
        <Box>
            <h4>{title}</h4>
        </Box>
    )
}