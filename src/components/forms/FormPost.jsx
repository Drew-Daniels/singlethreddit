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
import { MAX_POST_MEDIA_SIZE_BYTES } from '../../constants';

const Input = styled('input')({
    display: 'none',
});

export default function FormPost(props) {

    const { groups, groupAvatarURLs, selectedGroup, setSelectedGroup } = props;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const user = useContext(UserContext);
    const fileRef = useRef();
    const navigate = useNavigate();

    function handleInputChange(e) {
        var fn;
        const target = e.target;
        const {id, value} = target;
        switch(id) {
            case 'title':
                fn = setTitle;
                break;
            case 'body':
                fn = setBody;
                break;
            default:
                break;
        }
        if (fn) { fn(prev => value) }
    }

    function handleFileChange() {
        const file = fileRef.current.files[0];
        if (file.size <= MAX_POST_MEDIA_SIZE_BYTES) { 
            const url = URL.createObjectURL(file);
            setFileUrl(url);

        } else {
            alert(`File size must be below 15mb`) 
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        var groupAvatarURL = await selectedGroup.getAvatarURL();
        var post = await addPost(user, groupAvatarURL, selectedGroup.baseName, body, title);
        const file = fileRef.current.files[0];
        if (file) {
            await uploadPostMedia(file, post.id);
        }
        navigate('/');
    }

    return (
        <>
            <GroupsDropdown groups={groups} groupAvatarURLs={groupAvatarURLs} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} redirect={false}/>
            <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className='preview'>
                    {fileUrl
                    ? <img src={fileUrl} alt='Post file preview' />
                    : <p>No media uploaded</p>
                    }
                </div>
                <TextField fullWidth variant='outlined' id='title' label='title' placeholder='Title' required value={title} onChange={(e) => handleInputChange(e)} />
                <TextField fullWidth variant='outlined' id='body' label='body' placeholder='Text (optional)' multiline rows={4} required value={body} onChange={(e) => handleInputChange(e)} />
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <label htmlFor="icon-button-file">
                        <Input accept='image/*, video/*' id="icon-button-file" type="file"  ref={fileRef} onChange={handleFileChange}/>
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