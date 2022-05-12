import { Reset } from 'styled-reset';
import { Outlet } from 'react-router-dom';
import {ReactComponent as AppIcon} from './icons/app-icon.svg';
import Navbar from './components/Navbar';

function App() {
  const appName = 'Singlethreddit'

  return (
      <div className="App">
        <Reset />
        <Navbar AppIcon={AppIcon} appName={appName} />
        <Outlet />
      </div>
  );
}

export default App;
