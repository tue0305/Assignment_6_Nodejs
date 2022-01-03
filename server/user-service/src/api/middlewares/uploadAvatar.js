const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadAvatar = (type) => {
   try {
    const made = mkdirp.sync(`./public/images/${type}`);
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `./public/images/${type}`); // set file location
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname); // Rename file image
      },
    });
    const upload = multer({
      storage: storage,
      fileFilter: function (req, file, cb) {
        const extensionImageList = [".png", ".jpg",".PNG",".JPG",".MKV"];
        const extension = file.originalname.slice(-4);
        const check = extensionImageList.includes(extension);
        if (check) {
          cb(null, true);
        } else {
          cb(new Error("Extension error!"));
        }
      },
    });
  
    return upload.single(type);
   } catch (error) {
     console.log(error.message)
   }
};
module.exports = uploadAvatar