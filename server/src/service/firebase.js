const admin = require("firebase-admin");
/** Load environment variables */
require("dotenv").config();

exports.firebaseCreateUser = async ({ email, password, displayName }) => {
  try {
    const firebaseUser = await admin
      .auth()
      .createUser({ email, password, displayName, disabled: false });
    return { firebaseUser, error: null };
  } catch (error) {
    return { firebaseUser: null, error };
  }
};

exports.firebaseAdminInitializeApp = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: "https://bug-tracker-80c07.firebaseio.com",
  });
};
