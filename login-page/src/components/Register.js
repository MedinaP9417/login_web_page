import React, { Fragment, useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function register() {
    if (password != password2) {
      alert("Passwords don't match!");
    } else {
      const user = {
        name,
        email,
        password,
      };
      console.log(user);
    }
  }

    const [user, setUser] = useState([name, email, password]);

    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const body = { user };
        const response = await fetch(
          "http://localhost:4000/users/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        window.location = "/users/login";
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };

  return (
    <Fragment>
      <h1 className="text-center m-5">Register </h1>
      <form className="m-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="form-control"
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          className="form-control"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="form-control"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          id="Password2"
          name="Password2"
          placeholder="Confirm password"
          className="form-control"
          value={password2}
          required
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <button onClick={register} className="btn btn-m btn-outline-secondary">
          Register
        </button>
        <br />
      </form>
      <div>
        <a
          href="/users/login"
          style={{ color: "black", textDecoration: "none" }}
          className="text-center m-5"
        >
          Click to Login.
        </a>
      </div>
    </Fragment>
  );
}


