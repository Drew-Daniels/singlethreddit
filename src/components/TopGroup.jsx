import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function TopGroup(props) {

    const { user, group, groups, setGroups, position } = props;
    const { baseName, members } = group;
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

    function handleClick() {
        const newGroups = [...groups].filter(g => g.baseName !== group.baseName);
        const newGroup = {...group};
        // add user to group's members array
        newGroup.members.push(user.uid);
        // update groups
        newGroups.push(newGroup);
        setGroups(prevGroups => newGroups);
    }

    return (
        <ListItem>
            <Link component={RouterLink} to={'g/' + baseName} sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem', fontSize: 12 }}>
                <span>{position}</span>
                <Avatar src={avatarURL} alt={baseName + ' avatar'} />
                <span>{baseName}</span>
            </Link>
            {/* {!(members.includes(user.uid)) &&
                <Button variant='contained' onClick={handleClick}>Join</Button>
            } */}
        </ListItem>
    )
}