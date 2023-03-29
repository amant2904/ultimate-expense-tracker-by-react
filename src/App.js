import React, { useContext } from 'react';
import './App.css';
import Authentication from './components/pages/Authentication';
import AuthContext from './components/store/auth-context';
import Welcome from './components/pages/Welcome.js';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn
  return (
    <React.Fragment>
      {!isLoggedIn && <Authentication />}
      {isLoggedIn && <Welcome />}
    </React.Fragment>
  );
}

export default App;
