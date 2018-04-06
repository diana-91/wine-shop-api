const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'products-image',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  filename: (req, file, next) => {
    next(undefined, file.filename);
  }
});

const parser = multer({
  storage,
  fileFilter: (req, file, next) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      next(null, false, new Error('Only image files are allowed!'));
    } else {
      next(null, true);
    }
  }
});

module.exports = parser;
