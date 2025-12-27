import multer from "multer";
import path from "path";

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/users"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadUser = multer({ storage: userStorage });
