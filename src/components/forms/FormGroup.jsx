import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { addGroup } from '../../db/groups/groups';

export default function FormGroup({open, handleClose}) {

    const [baseName, setBaseName] = useState('');
    const [displayName, setDisplayName] = useState('');
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
    async function handleSubmit(e) {
        e.preventDefault();
        handleClose();
        await addGroup(baseName, displayName, description, [user.uid], rules);
        setRules(prevRules => []);
        setRule(prevRule => '');
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor: 'black'}}
        >
            <form onSubmit={handleSubmit}>
                <h1>Create a group</h1>
                <h2>Group names including capitalization cannot be changed</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        id="base-name"
                        value={baseName}
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
                    <OutlinedInput
                        id="display-name"
                        value={displayName}
                        onChange={(e) => handleInputChange(e)}
                        aria-describedby="base-name-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        id="description"
                        value={description}
                        onChange={(e) => handleInputChange(e)}
                        aria-describedby="base-name-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}
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