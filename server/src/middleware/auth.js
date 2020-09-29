const admin = require("firebase-admin");
const url = require("url");
const { head } = require("../server");

/** Return messages */
const MSG_ON_TOKEN_EXPIRED = "Token has already expired.";
const MSG_ON_TOKEN_REVOKED = "Token has been revoked.";
const MSG_ON_ACCESS_DENIED = "Access Denied.";

/** Firebase auth errors: https://firebase.google.com/docs/auth/admin/errors */
const TOKEN_EXPIRED = "auth/id-token-expired";
const TOKEN_REVOKED = "auth/id-token-revoked";
const USER_NOT_FOUND = "auth/user-not-found";
const EMAIL_ALREADY_EXIST = "auth/email-already-exists";

/** Obtain bearer token in header */
const getIdTokenFromHeader = (headers) => {
  let idToken = "";
  if (headers.authorization || headers.authorization.startsWith("Bearer ")) {
    const authHeader = headers.authorization.split("Bearer ");
    [, idToken] = authHeader;
  } else {
    throw new Error();
  }
  return idToken;
};

/** Helper for creating full url */
const fullUrl = (req) => {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
};

/** Middleware protecting routes from unauthorized access */
exports.firebaseLoginRequired = async (req, res, next) => {
  try {
    const idToken = getIdTokenFromHeader(req.headers);
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.auth = decodedToken;
    return next();
  } catch (err) {
    let message = MSG_ON_ACCESS_DENIED;
    if (err.code === TOKEN_EXPIRED) message = MSG_ON_TOKEN_EXPIRED;
    if (err.code === TOKEN_REVOKED) message = MSG_ON_TOKEN_REVOKED;
    const error = {
      message,
      status: 400,
    };
    const bearer = `Bearer realm=${fullUrl(req)}`;
    res.setHeader("WWW-Authenticate", bearer);
    return res.status(error.status).send(error);
  }
};
