import { useState, useContext, useRef } from 'react';
import { addPost } from '../../db/comments/comments';
import { uploadPostMedia } from '../../utils/storage/storage';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import GroupsDropdown from '../../components/Dropdowns/GroupsDropdown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Input = styled('input')({
    display: 'none',
});

export default function FormPost(props) {

    const { groups, groupAvatarURLs, selectedGroup, setSelectedGroup } = props;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const user = useContext(UserContext);
    const fileRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        var groupAvatarURL = await selectedGroup.getAvatarURL();
        var post = await addPost(user, groupAvatarURL, selectedGroup.baseName, body, title);
        console.log(fileRef)
        const file = fileRef.current.files[0];
        if (file) {
            await uploadPostMedia(file, post.id);
        }
        navigate('/');
    }

    return (
        <>
            <GroupsDropdown groups={groups} groupAvatarURLs={groupAvatarURLs} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} redirect={false}/>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth variant='outlined' label='title' placeholder='Title' required value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField fullWidth variant='outlined' label='body' placeholder='Text (optional)' multiline rows={4} required value={body} onChange={(e) => setBody(e.target.value)} />
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" ref={fileRef} />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Button type='submit'>Post</Button>
                </Box>
            </form>
        </>
        
    )
}