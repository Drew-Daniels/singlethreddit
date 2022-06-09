import Box from '@mui/material/Box';

export default function PostCardMain(props) {

    const { title, mediaURL } = props;
    
    return (
        <Box>
            <h4>{title}</h4>
            {mediaURL &&
                <img src={mediaURL} alt='post media' />
            }
        </Box>
    )
}