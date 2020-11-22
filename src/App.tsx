import React, { useEffect, useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
// import TestComponent from './components/TestComponent';
import Test from './components/TestPropsAshton';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from 'react-router-dom'; 


const App: React.FunctionComponent = () => {

  const [sessionToken, setSessionToken] = useState('');
  const [shopOwner, setShopOwner] = useState(false);

  function updateToken(newToken: string) {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  //put shopowner in the local storage
  function updateShopOwner(isShopOwner: string) {
    localStorage.setItem('shopOwner', isShopOwner);
    setShopOwner(isShopOwner);
    console.log(shopOwner);
  }  

  return (
    <div className="App">
      <Router>
      <TitleBar updateShopOwner={updateShopOwner} updateToken={updateToken}/>
      {/* <TestComponent /> */}
      {/* <Test name='hello'/> */}
      </Router>
    </div>
  );
}

export default App;