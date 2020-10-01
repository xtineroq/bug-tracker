import React from "react";
import { logIn, logOut, signUp } from "../Service/auth";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";

/** Context for handling authentication */
export const AuthContext = React.createContext({});

/** Error messages */
const LOGIN_ERROR_MESSAGE = "Invalid Email Address or Password";
const SIGNUP_ERROR_MESSAGE = "User Already Exists";

/** Action types */
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_ERROR";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_FAILED = "SIGNUP_ERROR";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOADING = "LOADING";

/** Protected route */
const BOARD_ROUTE = "/board";

/** Routes */
const ROOT_ROUTE = "/";

/** Initial state */
const initialState = {
  isAuthenticated: false,
  loading: false,
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
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        error: SIGNUP_ERROR_MESSAGE,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
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

  /** On every new/refreshed page
   *  Check if user is already logged in
   */
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
        redirect(history, location, BOARD_ROUTE);
      }
    });
  }, []);

  /** Login handler
   *  >uses firebase login service
   *  >dispatches login success
   *  >redirects to /board
   */
  const loginHandler = async (email, password) => {
    try {
      dispatch({ type: LOADING, payload: true });
      await logIn(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch({ type: LOADING, payload: false });
      redirect(history, location, BOARD_ROUTE);
    } catch {
      dispatch({
        type: LOGIN_FAILED,
      });
      dispatch({ type: LOADING, payload: false });
    }
  };

  /** Signup handler
   *  >uses firebase signup service
   *  >dispatches signup success
   *  >redirects to /board
   */
  const signupHandler = async (email, password) => {
    try {
      dispatch({ type: LOADING, payload: true });
      await signUp(email, password);
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      dispatch({ type: LOADING, payload: false });
      redirect(history, location, BOARD_ROUTE);
    } catch {
      dispatch({
        type: SIGNUP_FAILED,
      });
      dispatch({ type: LOADING, payload: false });
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
      redirect(history, location, ROOT_ROUTE);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.loading,
        loginHandler,
        logoutHandler,
        signupHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
