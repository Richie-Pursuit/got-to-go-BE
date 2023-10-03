// IMPORTS
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");
const bathroomsController = require("./Controllers/bathroomsController.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


// Define where uploaded images will be stored
const storage = multer.diskStorage({
  destination: "./Images-Files",
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// products ROUTES
app.use("/bathrooms", bathroomsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to got-to-go App!");
});

// Handle image uploads
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send("File uploaded successfully.");
});

// Error
app.get("*", (req, res) => {
  res.status(404).send("Page does not exist");
});

// EXPORT
module.exports = app;
