import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { useState, useEffect, useCallback } from 'react';

export default function FormGroup(props) {

    const [groupName, setGroupName] = useState('');
    const [numCharactersLeft, setNumCharactersLeft] = useState(21)

    useCallback(() => {
        setNumCharactersLeft(prev => 21 - groupName.length);
    }, [groupName])

    function handleChange(e) {
        setGroupName(prev => e.target.value)
    }

    return (
        <form>
            <h1>Create a group</h1>
            <h2>Group names including capitalization cannot be changed</h2>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    value={groupName}
                    onChange={handleChange}
                    endAdornment={<InputAdornment position="start">g/</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="outlined-weight-helper-text">{5} characters remaining</FormHelperText>
            </FormControl>
        </form>
    )
}