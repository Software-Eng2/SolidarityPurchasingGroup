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
import FarmerPlanning from './components/FarmerPlanning';
import FarmerInterface from './components/FarmerInterface';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setUserid] = useState(0);
  const [userEmail, setUserEmail] = useState(''); //getting the email
  const [userRole, setUserRole] = useState('');
  const [dirty, setDirty] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);
  const routerHistory = useHistory();
  const [products, setProducts] = useState([]);
  const [notificationFlag, setNotificationFlag] = useState(0); // 0 notification not showed yet, 1 notification showed
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [currentClient, setCurrentClient] = useState('');

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

  useEffect (()=> {
    if(userRole === "client" && userid){
      API.getClientById(userid).then((client) => {
        setCurrentClient(client);
        API.getNotifications(userid).then((notification)=>{
          if(notification.length > 0){
            API.getCancellingOrdersByClientId(userid).then((orders) => {
              setCancelOrders(orders);
              // fare questa procedura quando si devono marcare gli ordini marcare gli ordini come cancelling, non qui!!!
              /*
              let sum = 0;
              orders.map((o) => {sum += o.total;})
              console.log(sum);
              console.log(client.amount);
              if(sum < client.amount){
                setNotificationFlag(1);
              }*/

            });
          }
        });
      });
    }
  },[userid,userRole])

  useEffect (()=> {
    if(userRole === "farmer" && userid){
      API.getProductsByFarmer(userid).then((products) => {
        setFarmerProducts(products);
    });
    }
  },[userid,userRole])



  const doLogIn = (email, password) => {
    API.logIn(email, password).then(([e]) => {   
      API.getUserInfo().then((user) => {      
        setUserEmail(e);
        setUserid(user.id);
        setLoggedIn(true);
        setUserRole(user.role);
        setDirty(true);  
        switch(user.role){
          case 'shopemployee':
            routerHistory.push('/clientlist');  
            window.location.reload();
            break;
          case 'client':
            console.log(userid);
            routerHistory.push('/products');  
            window.location.reload();
            break;
          case 'farmer':
            routerHistory.push('/farmer');  
            window.location.reload(); 
            break;
          default:
            routerHistory.push('/');

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
      setUserid(0);
      setUserRole('');
      setCancelOrders([]);
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
        <>
          <Market products={products} userid={userid} userRole={userRole} currentClient={currentClient}
                  client={location.state ? location.state.client : ""} show={cancelOrders ? (cancelOrders.length > 0 && notificationFlag === 0) : false }
                  cancelOrders={cancelOrders} setNotificationFlag={setNotificationFlag}/>
        </>
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
          <VirtualClock/>
        </Route>

        {loggedIn ? (
            ''
          ) : (<Route exact path="/login">
          <LoginForm doLogIn={doLogIn}/>
        </Route>) }
        <Route exact path="/farmer">
          {loggedIn ? <FarmerInterface products={farmerProducts} userid={userid} /> : <LoginForm doLogIn={doLogIn}/>}        
        </Route>
        <Route exact path="/farmerPlanning">
          <FarmerPlanning userid={userid} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
