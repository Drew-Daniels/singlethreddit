import GroupsDropdown from '../../components/Dropdowns/GroupsDropdown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function FormPost(props) {

    const { groups } = props;

    return (
        <>
            <GroupsDropdown groups={groups} />
            <form>
                <TextField fullWidth variant='outlined' label='title' placeholder='Title' required />
                <TextField fullWidth variant='outlined' label='body' placeholder='Text (optional)' multiline rows={4} required />
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button>Post</Button>
                </Box>
            </form>
        </>
        
    )
}