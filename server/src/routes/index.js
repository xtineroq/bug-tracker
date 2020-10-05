const express = require("express");
const router = express.Router();
const { firebaseLoginRequired } = require("../middleware/auth");
const bugsController = require("../controllers/bugsController");

router.route("/bugs")
    // firebaseLoginRequired - check if request has token before proceeding
    .get(bugsController.findAll)
    .post(bugsController.save)

router.route("/bugs/:id")
    .get(bugsController.findById)
    .put(bugsController.update)
    .delete(bugsController.remove)

module.exports = router;