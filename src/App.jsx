import parallel from 'async/parallel';
import { auth, signIn, db, storage } from './firebase-setup';
import { getAllComments, getAllPosts } from './db/comments/comments';
import { getAllGroups } from './db/groups/groups';

import 'firebaseui/dist/firebaseui.css'
import { useState, useEffect, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import {ReactComponent as AppIcon} from './icons/app-icon.svg';
import Navbar from './components/Navbar';

function App() {
  const appName = 'Singlethreddit'
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(prevUser => user);
    });

    setup();

    // DEFINITIONS
    async function setup() {
      await loadComments();    

      parallel([
        loadGroups,
        loadPosts,
      ], function(err, results) {
          if (err) {
            console.error(err);
          } else {
            setLoaded(true);
          }
      });
    }
    async function loadComments() {
      try {
        const cs = await getAllComments();
        setComments(cs);
        return true;
      }
      catch (err) {
        console.error(err);
        return false;
      }
    }
    async function loadGroups(cb) {
      try {
        const gs = await getAllGroups();
        setGroups(gs);
      }
      catch (err) {
        console.error(err);
      }
    }
    async function loadPosts(cb) {
      try {
        const ps = await getAllPosts(comments);
        setPosts(ps);
      }
      catch (err) {
        console.error(err);
      }
    }
  }, [comments]);

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar AppIcon={AppIcon} appName={appName} signIn={signIn} user={user} groups={groups} selectedGroup={selectedGroup} handleSelectGroup={setSelectedGroup} />
          <Outlet context={{ user, groups, selectedGroup, handleSelectGroup: setSelectedGroup, posts, setPosts, comments }} />
        </ThemeProvider>
      </Container>
  );
}

export default App;
