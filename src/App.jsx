import { Reset } from 'styled-reset';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
      <div className="App">
        <Reset />
        <Navbar />
        <Outlet />
      </div>
  );
}

export default App;
