import './App.sass'
import React, {Fragment} from 'react';
import InputQuestion from './components/InputQuestion';
import ListQuestions from './components/ListQuestions';
function App() {
  return (
    <div>
      <header>
        <h1>Login Page 😊</h1>
        <Fragment>
          <InputQuestion />
          <ListQuestions />
        </Fragment>
      </header>
    </div>
  );
}

export default App;
