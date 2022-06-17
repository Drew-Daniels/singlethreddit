import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect, useContext, useRef } from 'react';
import { uploadGroupAvatar } from '../../utils/storage/storage';
import UserContext from '../../contexts/UserContext';
import { MAX_POST_MEDIA_SIZE_BYTES } from '../../constants';
import { addGroup } from '../../db/groups/groups';

import { styled } from '@mui/material/styles';
const Input = styled('input')({
    display: 'none',
});

export default function FormGroup({open, handleClose}) {

    const [baseName, setBaseName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const fileRef = useRef();
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState([]);
    const [rule, setRule] = useState('');
    const [numCharactersLeft, setNumCharactersLeft] = useState(21);
    const user = useContext(UserContext);

    useEffect(() => {
        setNumCharactersLeft(prev => 21 - baseName.length);
    }, [baseName])

    function handleInputChange(e) {
        var fn;
        var target = e.target;
        const {id, value} = target;
        switch (id) {
            case 'base-name':
                fn = setBaseName;
                break;
            case 'display-name':
                fn = setDisplayName;
                break;
            case 'description':
                fn = setDescription;
                break;
            case 'rule':
                fn = setRule;
                break;
            default:
                break;
        }
        if (fn) {
            fn(prev => value);
        }
    }
    function handleAddRule() {
        const newRules = [...rules];
        newRules.push(rule);
        setRules(newRules);
        setRule('');
    }
    function handleFileChange() {
        const currFile = fileRef.current.files[0];
        setFile(prev => currFile);
        if (currFile.size <= MAX_POST_MEDIA_SIZE_BYTES) { 
            const url = URL.createObjectURL(currFile);
            setFileUrl(url);
        } else {
            alert(`File size must be below 15mb`) 
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        handleClose();
        try {
            await addGroup(baseName, displayName, description, [user.uid], rules);
            if (file) {
                await uploadGroupAvatar(file, baseName);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setRules(prevRules => []);
            setRule(prevRule => '');
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor: 'black'}}
        >
            <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <h1>Create a group</h1>
                <div className='preview' sx={{ display: 'flex', width: '5em' }}>
                    {fileUrl
                    ? <img src={fileUrl} alt='Post file preview'/>
                    : <p>No media uploaded</p>
                    }
                </div>
                <label htmlFor="icon-button-file">
                    <span>{`Avatar (${MAX_POST_MEDIA_SIZE_BYTES / 1000}kb max)`}</span>
                    <Input accept='image/*, video/*' id="icon-button-file" type="file" ref={fileRef} onChange={handleFileChange}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <h2>Group names including capitalization cannot be changed</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor='base-name'>Group Name</InputLabel>
                    <OutlinedInput
                        id="base-name"
                        value={baseName}
                        label='Group Name'
                        onChange={(e) => handleInputChange(e)}
                        startAdornment={<InputAdornment position='start'>g/</InputAdornment>}
                        aria-describedby="base-name-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}
                    />
                    <FormHelperText id="base-name-helper-text">{numCharactersLeft} characters remaining</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor='display-name'>Display Name</InputLabel>
                    <OutlinedInput
                        id="display-name"
                        value={displayName}
                        label='Display Name'
                        onChange={(e) => handleInputChange(e)}
                        aria-describedby="base-name-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <OutlinedInput
                        id="description"
                        value={description}
                        label='Description'
                        onChange={(e) => handleInputChange(e)}
                        aria-describedby="base-name-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}
                        multiline
                        minRows={4}
                    />
                </FormControl>
                <h2>Rules:</h2>
                <ul className='rules'>
                    {rules.map((rule, i) => {
                        return <li key={i}>{rule}</li>
                    })}
                </ul>
                <Box>
                    <OutlinedInput 
                        id='rule'
                        value={rule}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <Button onClick={handleAddRule}>Add Rule</Button>
                </Box>
                <Button onClick={handleClose} >Cancel</Button>
                <Button type='submit'>Submit</Button>
            </form>
        </Modal>
    )
}