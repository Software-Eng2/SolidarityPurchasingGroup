import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router,Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';
import ShopEmployeePage from './components/ShopEmployeePage';
import RegisterInterface from './components/RegisterPage';
import Wallet from './components/Wallet';
import Market from './views/Market';
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
  const [products, setProducts] = useState([]); 

  useEffect(()=>{
    API.getAllProducts().then((products) => {
      setProducts(products);
    })
  },[])


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
        setAllClients(newC);
        setDirty(false);
      }).catch((err) => console.log(err));
      }
     },[loggedIn, dirty]);

    

  const doLogIn = (email, password) => {
    API.logIn(email, password).then(([email,id]) => {   
      API.getUserInfo().then((user) => {      
        setUserEmail(email);
        setUserid(id);
        setLoggedIn(true);
        setUserRole(user.role);
        console.log(user.role);  
        setDirty(true);  
        switch(user.role){
          case 'shopemployee':
            routerHistory.push('/shopemployee');  
            window.location.reload();
            break;
          /* case 'client':
            routerHistory.push('/client');  
            window.location.reload(); */ //TODO ADD NEW ROUTE PER ACTOR
        }
      }).catch((err) => console.log(err));   
    }).catch((err) => {
      console.log(err);
    });
  };

  const doLogOut = () => {
    API.logOut().then(() => {
      setLoggedIn(false);
      setUserEmail('');
      setUserid('');
      setUserRole('');
      routerHistory.push('/');
    }).catch((err) => console.log(err));
  };

  return (
    <Router>
      <NavBar loggedIn={loggedIn} doLogOut={doLogOut}/>
      <Switch>
        <Route exact path="/">
          <h1>Homepage</h1>
        </Route>
        <Route exact path="/products">
          <Market products={products}></Market>        
        </Route>
        <Route exact path="/orders">
          <OrderPage/>         
        </Route>
        <Route exact path="/shopemployee">
          <ShopEmployeePage allClients={allClients}/>
        </Route>
        {loggedIn ? (
            ''
          ) : (<Route exact path="/login">
          <LoginForm doLogIn={doLogIn}/>
        </Route>) }
      </Switch>
    </Router>
  );
}

export default App;
