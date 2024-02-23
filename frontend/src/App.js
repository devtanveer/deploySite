import './App.css'
import Router from './components/Router'
import Context from './components/Context'
import React, { useState } from 'react';
import About from './pages/About';
import RegistrationForm from './pages/user/RegisterPage';

function App() {

  return (

    <>
      <Context.Provider value={ "Context Provider"}>
        <Router />
      </Context.Provider>
    </>
  );
}

export default App;
