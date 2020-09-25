import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from '../src/Components/LogIn';
import Board from '../src/Components/Board';
import './App.css';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
      <Board />
    </div>
  );
}

export default App;
