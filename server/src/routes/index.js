const express = require("express");
const router = express.Router();
const bugsController = require("../controllers/bugsController");
const userController = require("../controllers/userController");

router.route("/user").get(userController.findByEmail).post(userController.save);

router.route("/users").get(userController.findAll);

router.route("/bugs").get(bugsController.findAll).post(bugsController.save);

router
  .route("/bugs/:id")
  .get(bugsController.findById)
  .put(bugsController.update)
  .delete(bugsController.remove);

module.exports = router;
