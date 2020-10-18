// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import axios from "axios";

const ERROR_MSG = "Something went wrong.";

const logIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log("ERROR::login", error);
    throw error;
  }
};

const signUp = async ({ email, password, username, role }) => {
  try {
    // Create the user on server side
    await axios.post("/user", {
      email,
      password,
      username,
      role,
    });
    // Log in the user
    await logIn(email, password);
  } catch (error) {
    console.log("ERROR:::signup:login", error);
    let errorMSG = ERROR_MSG;

    /** Get the error (4xx, 5xx) response */
    const { response } = error;
    const { data } = response;
    if (data !== null) errorMSG = data.message;

    /** Throw an error */
    throw errorMSG;
  }
};

const logOut = () => firebase.auth().signOut();

export { logIn, logOut, signUp };
