const express = require('express');
const bathrooms_table = express.Router();
const cloudinary = require("../cloudinary");
const upload = require("../middleware/multer");

bathrooms_table.post('/upload', upload.single('image'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result){
    if(err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      })
    }

    res.status(200).json({
      success: true,
      message:"Uploaded!",
      data: result
    })
  })
});

module.exports = bathrooms_table;