import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import logo from './logo.svg';
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/navbar/Navbar"


function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <Navbar />
      <Home />
    </div>
=======
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Fragment>
    </Router>
>>>>>>> 538c919f57e23cf92f0c5d6538d4fdb3cfabd8fd
  );
}

export default App;
