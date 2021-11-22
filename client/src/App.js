import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router,Switch, Route, useHistory} from 'react-router-dom';
import { useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import OrdersPage from './components/OrdersPage';
import ShopEmployeePage from './components/ShopEmployeePage';
import RegisterInterface from './components/RegisterInterface';
import Market from './views/Market';
import Homepage from './components/Homepage';
import LoginForm from './LoginForm';
import API from './API';
import VirtualClock from './components/VirtualClock';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setUserid] = useState(0);
  const [userEmail, setUserEmail] = useState(''); //getting the email
  const [userRole, setUserRole] = useState('');
  const [dirty, setDirty] = useState(false);
  const [orders, setOrders] = useState([]);
  const routerHistory = useHistory();
  const [products, setProducts] = useState([]); 

  useEffect(()=>{
    API.getAllProducts().then((p) => {
      setProducts(p);
    });
  },[]);
  
  useEffect(()=>{
    API.getUserInfo().then((user) => {
      setUserEmail(user.email);
      setUserid(user.id);
      setLoggedIn(true);
      setUserRole(user.role);
      setDirty(true);
    })
  },[])

    // Rehydrate clientsList & ordersList when user is logged in
    useEffect(()=>{
      if(loggedIn && dirty){
        API.getAllOrders().then((o) => {
          setOrders(o);
        });
      }
     },[loggedIn, dirty]);

    

  const doLogIn = (email, password) => {
    API.logIn(email, password).then(([e,id]) => {   
      API.getUserInfo().then((user) => {      
        setUserEmail(e);
        setUserid(id);
        setLoggedIn(true);
        setUserRole(user.role);
        console.log(user.role);  
        setDirty(true);  
        switch(user.role){
          case 'shopemployee':
            routerHistory.push('/clientlist');  
            window.location.reload();
            break;
          case 'client':
            routerHistory.push('/products');  
            window.location.reload();
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
        <NavBar loggedIn={loggedIn} doLogOut={doLogOut} userRole={userRole}/>
      <Switch>
        <Route exact path="/">
          <Homepage/>
        </Route>
        <Route exact path='/products' render={({location}) => 
          <Market products={products} userid={userid} client={location.state ? location.state.client : ""}/>
        }/>
        <Route exact path="/orders">
          {loggedIn ? <OrdersPage orders={orders} setOrders={setOrders} loggedIn={loggedIn}/> : <LoginForm doLogIn={doLogIn}/>}        
        </Route>
        <Route exact path="/clientlist">
          {loggedIn ? <ShopEmployeePage/> : <LoginForm doLogIn={doLogIn}/>}
        </Route>
        <Route exact path="/registerform">
         <RegisterInterface userRole={userRole}/>
        </Route>
        <Route exact path="/clock">
          <VirtualClock></VirtualClock>
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
