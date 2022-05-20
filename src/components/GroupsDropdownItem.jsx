import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

export default function GroupDropdownItem(props) {

    const { group } = props;
    const navigate = useNavigate();

    return (
        <MenuItem onClick={() => navigate(`g/${group}`)} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} disableRipple>
            <Avatar />
            {group}
        </MenuItem>
    )
}