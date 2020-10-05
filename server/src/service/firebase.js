const admin = require("firebase-admin");
/** Load environment variables */
require("dotenv").config();

exports.firebaseAdminInitializeApp = () => {
  console.log(process.env.FIREBASE_PROJECT_ID);
  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: "https://bug-tracker-80c07.firebaseio.com",
  });
};
