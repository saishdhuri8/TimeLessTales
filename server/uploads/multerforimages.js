import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp'); // Use Vercel's temporary directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append timestamp for uniqueness
    }
});

const upload = multer({ storage: storage });

export default upload;
