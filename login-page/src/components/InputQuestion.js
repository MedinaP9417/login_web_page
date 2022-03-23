import React, { Fragment, useState } from "react";

export default function InputQuestion() {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        "http://localhost:4000/users/dashboard/questions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/users/dashboard";
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center m-5">What is your question? </h1>
      <form className="d-flex m-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-m btn-outline-secondary">Add</button>
      </form>
    </Fragment>
  );
}
