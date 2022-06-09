import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { useState, useEffect} from 'react';
import { addGroup } from '../../db/groups/groups';

export default function FormGroup({open, handleClose}) {

    const [baseName, setGroupName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState([]);
    const [numCharactersLeft, setNumCharactersLeft] = useState(21)

    useEffect(() => {
        setNumCharactersLeft(prev => 21 - baseName.length);
    }, [baseName])

    function handleChange(e) {
        setGroupName(prev => e.target.value)
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        await addGroup(baseName, displayName, description, rules)
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor: 'black'}}
        >
            <form onSubmit={handleSubmit}>
                <h1>Create a group</h1>
                <h2>Group names including capitalization cannot be changed</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        value={baseName}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position='start'>g/</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">{numCharactersLeft} characters remaining</FormHelperText>
                </FormControl>
                <Button>Cancel</Button>
                <Button type='submit'>Submit</Button>
            </form>
        </Modal>
    )
}