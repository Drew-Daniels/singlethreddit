import { auth, signIn } from './firebase-setup';
import { listenToGroups, listenToUserGroups } from './db/groups/groups';
import { listenToPosts } from './db/comments/comments';
import 'firebaseui/dist/firebaseui.css'
import { useState, useEffect, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import {ReactComponent as AppIcon} from './icons/app-icon.svg';
import Navbar from './components/Navbar';
import FormGroup from './components/Forms/FormGroup';
import UserContext from './contexts/UserContext';
import SortContext from './contexts/SortContext';
import GroupAvatarsContext from './contexts/GroupAvatarsContext';

// APP
function App() {
  const appName = 'Singlethreddit'
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupAvatarURLs, setGroupAvatarURLs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeSort, setActiveSort] = useState('most-recent');
  const [sortField, setSortField] = useState('timeCreated');
  const [sortDesc, setSortDesc] = useState(true);
  const [groupFormOpen, setGroupFormOpen] = useState(false);

  useEffect(function setAuth() {
    auth.onAuthStateChanged(user => {
      setUser(prevUser => user);
    });
  }, []);

  useEffect(() => {
    listenToGroups(setGroups);
  }, []);

  useEffect(() => {
    listenToUserGroups(user, setUserGroups);
  }, [user]);

  useEffect(() => {
    listenToPosts(userGroups, setPosts, sortField, sortDesc);
  }, [userGroups, sortField, sortDesc])

  useEffect(() => {
    loadGroupAvatarURLs();

    async function loadGroupAvatarURLs() {
      const urls = {};
      await Promise.all(groups.map(async (group) => {
        const {baseName} = group;
        try {
          const url = await group.getAvatarURL();
          urls[baseName] = url;
        } catch (err) {
          console.error(err);
        }
      }))
      setGroupAvatarURLs(prev => urls);
    }
  }, [groups]);

  function sortHot() {
    setSortField('karma');
    setSortDesc(true);
    setActiveSort('hot');
  }

  function sortMostRecent() {
    setSortField(prev => 'timeCreated');
    setSortDesc(prev => true);
    setActiveSort(prev => 'most-recent');
  }

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const showGroupForm = () => setGroupFormOpen(true);
  const hideGroupForm = () => setGroupFormOpen(false);

  return (
      <Container maxWidth={false} disableGutters className="App" sx={{ minHeight: '100vh' }}>
        <UserContext.Provider value={user}>
          <SortContext.Provider value={activeSort}>
            <GroupAvatarsContext.Provider value={groupAvatarURLs}>         
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar 
                  AppIcon={AppIcon} 
                  appName={appName} 
                  signIn={signIn} 
                  userGroups={userGroups} 
                  selectedGroup={selectedGroup} 
                  setSelectedGroup={setSelectedGroup}
                  showGroupForm={showGroupForm}
                  hideGroupForm={hideGroupForm}
                />
                <FormGroup open={groupFormOpen} handleClose={hideGroupForm} />
                <Outlet context={{
                  userGroups,
                  groups, 
                  selectedGroup, 
                  setSelectedGroup,
                  posts,
                  selectedPost,
                  setSelectedPost,
                  sortField,
                  sortDesc,
                  sortHot, 
                  sortMostRecent
                }} />
              </ThemeProvider>
            </GroupAvatarsContext.Provider>
          </SortContext.Provider>
        </UserContext.Provider>
      </Container>
  );
}

export default App;
