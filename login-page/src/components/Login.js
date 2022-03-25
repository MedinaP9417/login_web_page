
import React, { Fragment, useState, useEffect } from "react";
import InputQuestion from './InputQuestion';
import ListQuestions from './ListQuestions';
import Dashboard from './Dashboard';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/users/dashboard";
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  

      useEffect(() => {
        if (localStorage.getItem("currentUser")) {
          window.location.href = "/";
        }
      }, []);
   function login() {
     const user = { email, password };
   }
  
  return (
    <Fragment>
      <h1 className="text-center m-3">Login </h1>
      <form className="d-flex m-5" onSubmit={onSubmitForm}>

        <input
          type="text"
          placeholder="email"
          className="form-control"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
          className="form-control"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login} className="btn btn-m btn-outline-secondary">
          Login
        </button>
        <br />
      </form>
      <div>
        <a
          style={{ color: "black", textDecoration: "none" }}
          href="/users/register"
          className="text-center m-5"
        >
          Don't have account? Click to Register.
        </a>
      </div>
   <Dashboard />
    </Fragment>
  );
}
