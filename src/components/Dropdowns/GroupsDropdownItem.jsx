import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

export default function GroupDropdownItem(props) {

    const { group, handleSelectGroup } = props;
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
        getAvatar()
            .then((res) => {
                setAvatarURL(res)
            });

        async function getAvatar() {
            const avatarURL = await group.getAvatarURL();
            return avatarURL;
        }
    }, [group])

    const navigate = useNavigate();

    function handleClick() {
        navigate(`g/${group.baseName}`);
        handleSelectGroup(group);
    }

    return (
        <MenuItem onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} disableRipple>
            <Avatar src={avatarURL} />
            {group.baseName}
        </MenuItem>
    )
}