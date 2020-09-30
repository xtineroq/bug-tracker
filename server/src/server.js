const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const { firebaseAdminInitializeApp } = require("./service/firebase");
const { firebaseLoginRequired } = require("./middleware/auth");

/** Load environment variables */
require("dotenv").config();

/** Express instance */
const app = express();

/** Router instance */
router = express.Router();

/** Firebase admin */
firebaseAdminInitializeApp();

/** Parameters formats: dev|combined */
app.use(morgan("dev"));

/** Parse body params and attach them to req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Gzip compression*/
app.use(compress());

/** Secure apps by setting various HTTP headers*/
app.use(helmet());

/** Enable CORS - Cross Origin Resource Sharing */
app.use(cors());

/** Sanity check */
router.route("/").get((req, res) => {
  res.status(200).send({ message: "Bug Tracker Backend" });
});

/**
 * @api {get} /secure Testing secured route
 * @apiName GetSecure
 * @apiGroup Secure
 * @apiPermission Authenticated
 * @apiSuccess {String} message Returns a default message
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "You're in!",
 *     }
 */
router.route("/secure").get(firebaseLoginRequired, (req, res) => {
  res.status(200).send({ message: "You're in!" });
});

/** Attach route */
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = app;
