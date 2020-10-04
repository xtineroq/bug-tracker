const express = require("express");
const router = express.Router();

const bugsController = require("../controllers/bugsController");

router.route("/bugs")
    .get(bugsController.findAll)
    .post(bugsController.save)

router.route("/bugs/:id")
    .get(bugsController.findById)
    .put(bugsController.update)
    .delete(bugsController.remove)

module.exports = router;