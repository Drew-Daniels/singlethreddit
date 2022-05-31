import { auth, signIn, db, storage } from './firebase-setup';
import { listenToGroups, listenToUserGroups } from './db/groups/groups';
import { 
  listenToComments, 
  addComment, 
  getPosts, 
  getPostComments 
} from './db/comments/comments';
import 'firebaseui/dist/firebaseui.css'
import { useState, useEffect, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import {ReactComponent as AppIcon} from './icons/app-icon.svg';
import Navbar from './components/Navbar';
import UserContext from './contexts/UserContext';
import SortContext from './contexts/SortContext';
import GroupAvatarsContext from './contexts/GroupAvatarsContext';

// APP
function App() {
  const appName = 'Singlethreddit'
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupAvatarURLs, setGroupAvatarURLs] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeSort, setActiveSort] = useState('most-recent');
  const [commentsSortField, setCommentsSortField] = useState('timeCreated');
  const [commentsSortDesc, setCommentsSortDesc] = useState(true);

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
    listenToComments(userGroups, setComments, commentsSortField, commentsSortDesc);
    console.log('called');
  }, [userGroups, commentsSortField, commentsSortDesc])

  useEffect(() => {
    loadGroupAvatarURLs();

    async function loadGroupAvatarURLs() {
      const urls = {};
      await Promise.all(groups.map(async (group) => {
        const {baseName} = group;
        const url = await group.getAvatarURL();
        urls[baseName] = url;
      }))
      setGroupAvatarURLs(prev => urls);
    }
  }, [groups]);

  function sortHot() {
    // TODO modify this to set the sort field to 'karma' calculated field once
    // Cloud function is deployed to calculate this on the fly.
    // This would enable for pagination and also ensure that we retrieve the most popular comment from
    // all comments in db rather than the most popular from the subset we retrieved in a snapshot.
    // new version:
    // setCommentsSortField('karma');
    // setCommentsSortDesc(true);

    var newOrder = [...comments].sort(compareHot);
    setComments(prevOrder => newOrder);
    setActiveSort('hot');

    function compareHot(a, b) {
        return (b.getKarma()) - (a.getKarma());
    }
  }

  function sortMostRecent() {
    // old version:
    var newOrder = [...comments].sort(compareMostRecent);
    setComments(prevOrder => newOrder);

    // setCommentsSortField(prev => 'timeCreated');
    // setCommentsSortDesc(prev => true);
    setActiveSort('most-recent');

    function compareMostRecent(a, b) {
        return b.timeCreated - a.timeCreated;
    }
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
                />
                <Outlet context={{
                  userGroups,
                  groups, 
                  selectedGroup, 
                  setSelectedGroup,
                  comments, 
                  getPosts,
                  getPostComments,
                  addComment,
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
