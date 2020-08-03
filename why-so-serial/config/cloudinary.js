const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

console.log(process.env.CLOUDINARY_CLOUD_NAME)

cloudinary.config({
  cloud_name: "patricio",
  api_key: "497629732415795",
  api_secret: "pa0mj6cUAqoBQqa6yB9tTMkKgdA"
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'images',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const parser = multer({ storage: storage });

module.exports = parser;