import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import { addUserToGroup } from '../db/groups/groups';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function TopGroup(props) {

    const { group, groupAvatarURL, position } = props;
    const { baseName, members } = group;

    const user = useContext(UserContext);

    return (
        <ListItem>
            <Link 
                component={RouterLink} 
                to={'g/' + baseName} 
                sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem', fontSize: 12 }} 
            >
                <span>{position}</span>
                <Avatar src={groupAvatarURL} alt={baseName + ' avatar'} />
                <span>{baseName}</span>
            </Link>
            {user != null && !(members.includes(user.uid)) &&
                <Button variant='contained' onClick={() => addUserToGroup(user, group)}>Join</Button>
            }
        </ListItem>
    )
}