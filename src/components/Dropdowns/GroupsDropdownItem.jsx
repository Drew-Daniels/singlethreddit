import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

export default function GroupDropdownItem(props) {

    const { group, groupAvatarURL, setSelectedGroup, handleClose, redirect } = props;

    const navigate = useNavigate();

    function handleClick() {
        if (redirect) {navigate(`g/${group.baseName}`)};
        setSelectedGroup(prevGroup => group);
        handleClose();
    }

    return (
        <MenuItem onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'none' }} disableRipple>
            <Avatar src={groupAvatarURL} />
            <span>{'g/' + group.baseName}</span>
        </MenuItem>
    )
}