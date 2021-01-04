import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import LogIn from "../src/Components/LogIn";
import Board from "../src/Components/Board";
import "./App.css";
import SignUp from "./Components/SignUp";
import AuthProvider, { AuthContext } from "./Context/Auth";

/** Firebase App (the core Firebase SDK) is always required and
 *  must be listed before other Firebase SDKs
 */
import * as firebase from "firebase/app";

/** Add the Firebase services that you want to use */
import "firebase/auth";

/** Initialize firebase at root component */
import { firebaseConfig } from "./Service/firebase";
firebase.initializeApp({ ...firebaseConfig });

/** Protects route that requires a logged in user */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = React.useContext(AuthContext);
  if (isAuthenticated) return <>{children}</>;
  else
    return (
      <Redirect
        to={{
          exact: true,
          pathname: "/",
          /** If you access a protected route
           *  we want to capture which route are you accessing
           *  since it will redirect you to a sign up page then
           *  redirects you back to your desired route.
           */
          from: location,
        }}
      />
    );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <LogIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <ProtectedRoute>
              <Route path="/board">
                <Board />
              </Route>
            </ProtectedRoute>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
