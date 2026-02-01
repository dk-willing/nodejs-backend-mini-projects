const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictedTo("admin", "lead-guide"),
    tourController.getAllTours,
  );

module.exports = router;
