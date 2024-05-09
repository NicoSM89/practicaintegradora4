const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '';
    switch (file.fieldname) {
      case 'profile':
        folder = 'profiles';
        break;
      case 'product':
        folder = 'products';
        break;
      default:
        folder = 'documents';
        break;
    }
    cb(null, `uploads/${folder}`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
