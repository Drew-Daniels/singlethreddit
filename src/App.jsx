import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import {ReactComponent as AppIcon} from './icons/app-icon.svg';
import Navbar from './components/Navbar';

function App() {
  const appName = 'Singlethreddit'

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar AppIcon={AppIcon} appName={appName} />
          <Outlet />
        </ThemeProvider>
      </div>
  );
}

export default App;
