## Bug tracker client

https://bug-tracker-80c07.web.app/

Getting Started

- Run the app in development: `npm run start`

- Building for production: `npm run build`

- Run prod build: `npm run start:prod`

A. Firebase Setup

a. Restrict who can use the api keys on https://console.developers.google.com/apis/credentials

b. Setup firebase hosting:

- Login to firebase: `firebase login`

- Create Manually files: _.firebaserc_ and _firebase.json_

- Or automatically create those files with: `firebase init` and follow instructions.

B. Deployment and Hosting to Firebase: `npm run deploy`

C. Getting CI tokens:

a. `npm run firebase login:ci` - for firebase installed as dependency or dev dependency

b. `firebase login:ci` - for firebase installed as global package

c. Follow the link provided to login.

d. After successful login, it will print the token in the terminal. Use the token for CI environment.
