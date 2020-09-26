import React from "react";
import { logIn, logOut } from "../Service/auth";
import { useHistory, useLocation } from "react-router-dom";

/** Context for handling authentication */
export const AuthContext = React.createContext({});

/** Error messages */
const LOGIN_ERROR_MESSAGE = "Invalid Username or Password";

/** Action types */
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_ERROR";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

/** Protected route */
const BOARD_ROUTE = "/board";

/** Initial state */
const initialState = {
  isAuthenticated: false,
  error: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        error: LOGIN_ERROR_MESSAGE,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
};

export const redirect = (history, location, route) => {
  const redirectTo = route !== "" ? route : location.state;
  return history.replace(redirectTo);
};

export default ({ children }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);
  const history = useHistory();
  const location = useLocation();

  /** Login handler
   *  >uses firebase login service
   *  >dispatches login success
   *  >redirects to /board
   */
  const loginHandler = async (email, password) => {
    try {
      const res = await logIn(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
      });
      redirect(history, location, BOARD_ROUTE);
    } catch {
      dispatch({
        type: LOGIN_FAILED,
      });
    }
  };

  /** Logout handler
   *  Redirects to /login
   */
  const logoutHandler = async () => {
    try {
      await logOut();
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
