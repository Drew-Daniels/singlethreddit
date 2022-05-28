import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

export default function GroupDropdownItem(props) {

    const { group, groupAvatarURL, handleSelectGroup, handleClose } = props;

    const navigate = useNavigate();

    function handleClick() {
        // navigate(`g/${group.baseName}`);
        handleSelectGroup(group);
        handleClose();
    }

    return (
        <MenuItem onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'none' }} disableRipple>
            <Avatar src={groupAvatarURL} />
            {'g/' + group.baseName}
        </MenuItem>
    )
}