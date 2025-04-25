const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Cho phép chỉ ảnh và video
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/quicktime'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép upload ảnh hoặc video'));
  }
};

const uploadCloudinary = multer({ storage, fileFilter });

module.exports ={
  uploadImage:uploadCloudinary.array("image",10),
  uploadVideo:uploadCloudinary.fields([
    {name:"video",maxCount:1},
    {name:"thumbnail",maxCount:1}
  ]),
  uploadSingleImage:uploadCloudinary.single("profile_picture")
};