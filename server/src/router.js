const express = require("express");

const usersController = require("./controllers/users.controller");
const authController = require("./controllers/auth.controller");

const router = express.Router();

// Users resource
router.post(`/users`, usersController.register);

// Authentication
router.post("/auth", authController.login);

module.exports = router;
