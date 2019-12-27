const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");
const app = express();

// Enable cors for public access
app.use(cors());

// JSON parsing
app.use(bodyParser.json());

// Remove express header
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

// API requests routing
app.use("/", router);

module.exports = app;
