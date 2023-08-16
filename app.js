// IMPORTS
const cors = require("cors");
const express = require("express");
const bathroomsController = require("./Controllers/bathroomsController.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// products ROUTES
app.use("/bathrooms", bathroomsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to got-to-go App!");
});

// Error
app.get('*', (req, res) => {
  res.status(404).send('Page does not exist');
});

// EXPORT
module.exports = app;