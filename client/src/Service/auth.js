// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

const logIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

const signUp = (email, password) =>
firebase.auth().createUserWithEmailAndPassword(email, password);

const logOut = () => firebase.auth().signOut();

export { logIn, logOut, signUp };
