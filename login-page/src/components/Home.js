import React, { Fragment } from "react";
// importing Link from react-router-dom to navigate to
// different end points.
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const Home = () => {
    
       try {
         const response = 
           "http://localhost:4000/users"
         
         
         console.log(response);
       } catch (err) {
         console.log(err.message);
       }
     
  return (
    <Fragment>
     
          <Register />

          <Login />
      
    </Fragment>
  );
};

export default Home;
