import { auth, db, storage } from './firebase-setup';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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
  const user = useState(auth.currentUser);

  useEffect(() => {
    console.log(user);
    console.log(user.photoURL);
  }, [user])

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
      <Container maxWidth={'xl'} disableGutters className="App" sx={{ minHeight: '100vh' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar AppIcon={AppIcon} appName={appName} user={user} />
          <Outlet user={user} />
        </ThemeProvider>
      </Container>
  );
}

export default App;
