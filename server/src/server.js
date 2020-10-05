const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const { firebaseAdminInitializeApp } = require("./service/firebase");
const { firebaseLoginRequired } = require("./middleware/auth");
const router = require("./routes");
const mongoose = require("mongoose");

/** Load environment variables */
require("dotenv").config();

/** Express instance */
const app = express();

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

/** Attach route */
app.use(router);

/** Connected to MongoDB Atlas */
mongoose.connect("mongodb://localhost/bugTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = app;
