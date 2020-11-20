import React, { useEffect, useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
// import TestComponent from './components/TestComponent';
import Test from './components/TestPropsAshton';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from 'react-router-dom'; 


const App: React.FunctionComponent = () => {

  const [sessionToken, setSessionToken] = useState('');

  function updateToken(newToken: string) {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  return (
    <div className="App">
      <Router>
      <TitleBar updateToken={updateToken}/>
      {/* <TestComponent /> */}
      {/* <Test name='hello'/> */}
      </Router>
    </div>
  );
}

export default App;