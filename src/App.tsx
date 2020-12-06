import React, { useEffect, useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from 'react-router-dom'; 


const App: React.FunctionComponent = () => {

  const [sessionToken, setSessionToken] = useState('');
  const [shopOwner, setShopOwner] = useState('false');

  //put authorization token in local storage
  function updateToken(newToken: string) {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  //put shopowner status in local storage
  function updateShopOwner(isShopOwner: string) {
    localStorage.setItem('shopOwner', isShopOwner);
    setShopOwner(isShopOwner);
    console.log(shopOwner);
  }  

  //remove token + shopowner from local storage
  function clearToken (){ //logout
    localStorage.clear();
    // setSessionToken('');
  }

  return (
    <div className="App">
      <Router>
      <TitleBar updateShopOwner={updateShopOwner} updateToken={updateToken} clearToken={clearToken} />
      <div className='footer centerText'>2020 GUBCo</div>
      </Router>
    </div>
  );
}

export default App;