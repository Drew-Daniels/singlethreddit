import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import GroupsDropdownItem from './GroupsDropdownItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GroupDropdownItem from './GroupsDropdownItem';
import {default as AddGroupIcon} from '@mui/icons-material/Add';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function GroupsDropdown(props) {
  const { groups, groupAvatarURLs, selectedGroup, handleSelectGroup } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayedGroups, setDisplayedGroups] = useState(groups);
  const [searchStr, setSearchStr] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (searchStr === '') { 
      setDisplayedGroups(groups)
    } else {
      const matchedGroups = groups.filter(group => group.baseName.includes(searchStr))
      setDisplayedGroups(matchedGroups);
    }
  }, [groups, searchStr])

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedGroup ? (
          <GroupDropdownItem group={selectedGroup} handleSelectGroup={handleSelectGroup} />
        ) : (
          <span>Groups</span>
        )
      }
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <TextField label='group' variant='outlined' value={searchStr} onChange={(e) => setSearchStr(e.target.value)} />
        <MenuItem sx={{ display: 'flex', alignItems: 'center' }}>
          <AddGroupIcon />
          <span>Add a Group</span>
        </MenuItem>
        <h1>My Groups</h1>
        <List>
          {displayedGroups.map((group, i) => {
            return (
              <GroupsDropdownItem key={i} group={group} groupAvatarURL={groupAvatarURLs[group.baseName]} handleSelectGroup={handleSelectGroup} handleClose={handleClose} />
            )
          })}
        </List>
      </StyledMenu>
    </div>
  );
}
