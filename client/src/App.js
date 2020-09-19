import React from 'react';
import logo from './logo.svg';
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/navbar/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
