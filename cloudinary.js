const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dgkkgldcc', 
  api_key: '676119642844847', 
  api_secret: 'waDzau_f233t9nlIDtMy_-PsMPA' 
});

module.exports = cloudinary;