import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router,Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';
import ShopEmployeePage from './components/ShopEmployeePage';
import RegisterInterface from './components/RegisterPage';
import Wallet from './components/Wallet';
import LoginForm from './Login';
import API from './API';
import { Button} from 'react-bootstrap';


function App() {

  const [allClients, setAllClients] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setUserid] = useState(0);
  const [userEmail, setUserEmail] = useState(''); //getting the email
  const [userRole, setUserRole] = useState('');
  const [dirty, setDirty] = useState(false);
  const [walletShow, setWalletShow] = useState(false);
  const [user, setUser] = useState([]); 
  const routerHistory = useHistory();




  useEffect(()=>{
    API.getUserInfo().then((user) => {
      setUserEmail(user.email);
      setUserid(user.id);
      setLoggedIn(true);
      setUserRole(user.role);
      setDirty(true);
    })
    API.getAllClients().then((newC)=>{
      setAllClients(newC);
    })
  },[])

    // Rehydrate meme when user is logged in
    useEffect(()=>{
      if(loggedIn && dirty){
        API.getAllClients().then((newC) => {
        console.log(newC);
        setAllClients(newC);
        console.log(allClients);
        setDirty(false);
      }).catch((err) => console.log(err));
      }
     },[loggedIn, dirty]);

    

  const doLogIn = (email, password) => {
    API.logIn(email, password).then(([email,id]) => {   
      API.getUserInfo().then((user) => {      
        setUserEmail(user.email);
        setUserid(user.id);
        setLoggedIn(true);
        setUserRole(user.role);  
        setDirty(true);  
      }).catch((err) => console.log(err));   
      console.log(userRole);
      switch(userRole){
        case 'shopemployee':
          console.log('ciao');
          routerHistory.push('/shopemployee');
        break;
        case 'client':
          routerHistory.push('/client');
        break;
        //TODO ADD NEW ACTOR ROUTES
      }      
      
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
      <NavBar loggedIn={loggedIn}/>
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
        <Route exact path="/shopemployee">
          <ShopEmployeePage allClients={allClients}/>
        </Route>

        <Route exact path="/login">
        {loggedIn ? (
            'YOU ARE ALREADY LOGGED IN'
          ) : (<Route exact path="/login">
          <LoginForm doLogIn={doLogIn}/>
        </Route>) }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
