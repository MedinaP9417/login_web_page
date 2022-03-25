import React, {Fragment} from 'react'
import InputQuestion from './InputQuestion';
import ListQuestions from './ListQuestions';

export default function Dashboard() {
  
  return (
    <div>
      <div className="navbar navbar-expand-sm navbar-light shadow-lg p-3 mb-0 m-auto bg-white rounded mt-5">
        <h1> Login Page </h1>
      </div>
      <Fragment>
        <InputQuestion />
        <ListQuestions />
      </Fragment>
    </div>
  );

  }