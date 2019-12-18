const express = require("express");

const usersController = require("./controllers/users.controller");
const router = express.Router();

const version = "v1";

/* Routes */
router.use(`/${version}/test`, usersController.test);

module.exports = router;
