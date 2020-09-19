import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import logo from './logo.svg';
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/navbar/Navbar"


function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
