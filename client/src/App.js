import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <h1>Homepage</h1>
        </Route>
        <Route exact path="/products">
          <h1>Products (+ Cart Management ?)</h1>          
        </Route>
        <Route exact path="/orders">
          <h1>Orders List</h1>          
        </Route>
        <Route exact path="/clients">
          <h1>Clients(+ wallet ?) List </h1> 
        </Route>
        <Route exact path="/login">
          <h1>Login & Sing In Forms</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
