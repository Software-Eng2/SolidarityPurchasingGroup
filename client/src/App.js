import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router,Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';
import Wallet from './components/Wallet';
import ClientsList from './components/ClientsList';
import LoginForm from './Login';
import API from './API';
import { Button} from 'react-bootstrap';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setUserid] = useState(0);
  const [userEmail, setUserEmail] = useState(''); //getting the email
  const [walletShow, setWalletShow] = useState(false);
  const [user, setUser] = useState([]); 
  const routerHistory = useHistory();


  const doLogIn = (email, password) => {
    API.logIn(email, password).then(([email,id]) => {
      setUserEmail(email);
      setUserid(id);
      setLoggedIn(true);
      routerHistory.push('/');
    }).catch((err) => {
      console.log(err);
    });
    
  };

  const doLogOut = () => {
    API.logOut().then(() => {
      setLoggedIn(false);
      setUserEmail('');
      setUserid('');
      routerHistory.push('/');
    }).catch((err) => console.log(err));
  };

  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <h1>Homepage</h1>
        </Route>
        <Route exact path="/products">
          <h1>Products (+ Cart Management ?)</h1>          
        </Route>
        <Route exact path="/orders">
          <OrderPage/>         
        </Route>
        <Route exact path="/clients">
        <>
          <ClientsList setWalletShow={setWalletShow} setUser={setUser}/>
          <Wallet show={walletShow} onHide={() => setWalletShow(false)} user={user}/>
        </>
        </Route>

        <Route exact path="/login">
        {loggedIn ? (
            ''
          ) : (<Route exact path="/login">
          <LoginForm doLogIn={doLogIn}/>
        </Route>) }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
