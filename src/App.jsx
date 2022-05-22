import { auth, signIn, db, storage } from './firebase-setup';
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
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(prevUser => user);
      setUserAvatar(prevAvatar => (user ? user.photoURL: ''));
    });
    loadGroups();

    async function loadGroups() {
      const gs = await getAllGroups();
      setGroups(gs);
    }
  }, []);

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
          <Navbar AppIcon={AppIcon} appName={appName} signIn={signIn} user={user} groups={groups} />
          <Outlet context={{userAvatar}} groups={groups} />
        </ThemeProvider>
      </Container>
  );
}

export default App;
