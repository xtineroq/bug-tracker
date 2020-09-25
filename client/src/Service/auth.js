// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

const signIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
}

export { signIn };
