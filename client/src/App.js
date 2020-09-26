import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "../src/Components/LogIn";
import Board from "../src/Components/Board";
import "./App.css";
import SignUp from "./Components/SignUp";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import { firebaseConfig } from "./Service/firebase";

firebase.initializeApp({ ...firebaseConfig });

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
          <Route path="/board" >
            <Board />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
