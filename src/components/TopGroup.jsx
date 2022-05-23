import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function TopGroup(props) {

    const { group, position } = props;
    const [avatarURL, setAvatarURL] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setup();

        async function setup() {
            await loadAvatar();
            setLoaded(true);
        }
        async function loadAvatar() {
            const res = await group.getAvatarURL();
            setAvatarURL(res);
        }
    }, [group])

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem', fontSize: 12 }}>
            <span>{position}</span>
            <Avatar src={avatarURL} alt={group.baseName + ' avatar'} />
            <span>{group.baseName}</span>
            <Button variant='contained'>Join</Button>
        </Box>
    )
}