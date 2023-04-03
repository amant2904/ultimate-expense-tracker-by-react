import React from 'react';
import './App.css';
import Authentication from './components/pages/Authentication';
import Welcome from './components/pages/Welcome.js';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <React.Fragment>
      {!isLoggedIn && <Authentication />}
      {isLoggedIn && <Welcome />}
    </React.Fragment>
  );
}

export default App;
