import { useState, useContext } from 'react';
import { addPost } from '../../db/comments/comments';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import GroupsDropdown from '../../components/Dropdowns/GroupsDropdown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function FormPost(props) {

    const { groups, groupAvatarURLs, selectedGroup, setSelectedGroup, addComment } = props;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const user = useContext(UserContext);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        var groupAvatarURL = await selectedGroup.getAvatarURL();
        await addPost(user, groupAvatarURL, selectedGroup.baseName, body, title);
        navigate('/');
    }

    return (
        <>
            <GroupsDropdown groups={groups} groupAvatarURLs={groupAvatarURLs} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} redirect={false}/>
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