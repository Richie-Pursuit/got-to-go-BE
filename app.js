// IMPORTS
const cors = require("cors");
const express = require("express");
const morgan = require('morgan');

const bathroomsController = require("./Controllers/bathroomsController.js");
const perksController = require("./Controllers/perksController.js");
const uploadRoute = require("./Controllers/routeUpload.js");


// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});



// products ROUTES
app.use("/bathrooms", bathroomsController);
app.use("/perks", perksController);
app.use("/image" , uploadRoute);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to got-to-go App!");
});

// Error
app.get("*", (req, res) => {
  res.status(404).send("Page does not exist");
});

// EXPORT
module.exports = app;