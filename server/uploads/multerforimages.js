import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file);
      console.log();
      
      cb(null, path.resolve('uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

export default upload;