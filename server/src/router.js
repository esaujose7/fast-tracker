const express = require("express");
const auth = require("./middleware/auth");

const usersController = require("./controllers/users");
const authController = require("./controllers/auth");
const fastingsController = require("./controllers/fastings");

const router = express.Router();

// Users resource
router.post("/users", usersController.register);
router.get("/users", auth, usersController.loadUser);

// Authentication
router.post("/auth", authController.login);

// Fasting actions
router.get("/fastings", auth, fastingsController.getFastings);
router.get("/fastings/latest", auth, fastingsController.getLastFast);
router.post("/fastings", auth, fastingsController.startFast);
router.put("/fastings/:id", auth, fastingsController.stopFast);

module.exports = router;
