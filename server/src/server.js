const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const { firebaseAdminInitializeApp } = require("./service/firebase");
const router = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");

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
app.use(
  expressCspHeader({
    directives: {
      "default-src": [SELF],
      "connect-src": [SELF, "googleapis.com", "*.googleapis.com"],
      "script-src": [SELF, " googleapis.com", "*.googleapis.com"],
      "style-src": [SELF, INLINE],
      "img-src": [SELF, "data:"],
      "worker-src": [NONE],
      "block-all-mixed-content": true,
    },
  })
);

/** Enable CORS - Cross Origin Resource Sharing */
app.use(cors());

/** Static files */
const clientBuildPath = path.join(__dirname, "build");
app.use(express.static(clientBuildPath));

/** Attach route */
app.use(router);

/** Send every other request to the React app
 * Define any API route before this runs
 */
app.get("/*", function (_, res) {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

/** Connected to MongoDB Atlas */
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bugTracker", {
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
