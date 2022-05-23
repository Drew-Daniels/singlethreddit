import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupsDropdown from '../../components/Dropdowns/GroupsDropdown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addComment } from '../../db/comments/comments';

export default function FormPost(props) {

    const { user, groups, selectedGroup, handleSelectGroup } = props;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        var uid = await user.uid;
        var displayName = await user.displayName;
        var success = await addComment(
            uid,
            displayName,
            selectedGroup.baseName,
            body
        );
        // show some kind of message indicating success or failure
        success ? console.log('Post submitted!') : console.log('There was an error');
        navigate('/');
    }

    return (
        <>
            <GroupsDropdown groups={groups} selectedGroup={selectedGroup} handleSelectGroup={handleSelectGroup} />
            <form onSubmit={handleSubmit}>
                <TextField fullWidth variant='outlined' label='title' placeholder='Title' required value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField fullWidth variant='outlined' label='body' placeholder='Text (optional)' multiline rows={4} required value={body} onChange={(e) => setBody(e.target.value)} />
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button type='submit'>Post</Button>
                </Box>
            </form>
        </>
        
    )
}