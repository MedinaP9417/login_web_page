import "./App.sass";
import React, { Fragment } from "react";
import InputQuestion from "./components/InputQuestion";
import ListQuestions from "./components/ListQuestions";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Link
} from "react-router-dom";


// import {Switch} from 'react-router-dom'
 

function App() {

  return (
    <div>
      <header>

        <Fragment>
          <Navbar />
          <Home />
        
          <>
            <Router>
              <Routes>
                <Route path="/users" component={Home} />
              </Routes>

              <Routes>
                <Route path="/users/register" component={Register} />
              </Routes>
              <Routes>
                <Route path="/users/login" component={Login} />
              </Routes>
              <Routes>
                <Route to="/users/dashboard" />
              </Routes>
            </Router>
          </>
        </Fragment>
      </header>
    </div>
  );
}

export default App;
