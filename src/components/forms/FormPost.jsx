import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function FormPost(props) {

    return (
        <form>
            <TextField fullWidth variant='outlined' label='title' placeholder='Title'/>
            <TextField fullWidth variant='outlined' label='body' placeholder='Text (optional)' multiline rows={4} />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button>Post</Button>
            </Box>
        </form>
    )
}