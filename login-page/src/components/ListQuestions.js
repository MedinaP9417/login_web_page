import React, { Fragment, useEffect, useState } from "react";
import EditQuestion from "./EditQuestion";

export default function ListQuestions() {

const [questions, setQuestions] = useState([])

const deleteQuestion = async id => {
    try{
const deleteQuestion = await fetch(`http://localhost:4000/users/dashboard/questions/${id}`, {
    method: "DELETE"
}
)
setQuestions(questions.filter(question => question.question_id !== id));
console.log(deleteQuestion);
    } catch (err) {
        console.error(err.message);
    }
}
  const getQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/users/dashboard/questions"
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setQuestions(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Fragment>
      <div className="d-flex">
        <table className="table p-5 m-5">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr> */}
            {questions.map((question) => (
              <tr ket={question.question_id}>
                <td>{question.description}</td>
                <td><EditQuestion question={question}/></td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteQuestion(question.question_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
