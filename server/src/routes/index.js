const express = require("express");
const router = express.Router();
const { firebaseLoginRequired } = require("../middleware/auth");
const bugsController = require("../controllers/bugsController");

router.route("/bugs")
    // firebaseLoginRequired - check if request has token before proceeding
    .get(bugsController.findAll)
    .post(firebaseLoginRequired, bugsController.save)

router.route("/bugs/:id")
    .get(firebaseLoginRequired, bugsController.findById)
    .put(firebaseLoginRequired, bugsController.update)
    .delete(firebaseLoginRequired, bugsController.remove)

module.exports = router;