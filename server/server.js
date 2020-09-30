/** We cant use this import method unless we use Babel */
// import express from "express";
// import morgan from "morgan";
// import compress from "compression";
// import cors from "cors";
// import helmet from "helmet";

const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");

/** Express instance */
const app = express();

/** Router instance */
router = express.Router();

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

/** Attach route */
app.use(router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = app;
