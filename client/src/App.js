import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router,Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';

function App() {
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
          <h1>Clients(+ wallet ?) List </h1> 
        </Route>
        <Route exact path="/login">
          <h1>Login & Sing In Forms</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
