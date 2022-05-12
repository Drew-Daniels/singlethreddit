import { Reset } from 'styled-reset';
import { Outlet } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Reset />
        <Outlet />
      </div>
  );
}

export default App;
