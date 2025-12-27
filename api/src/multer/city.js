import multer from "multer";
import path from "path";

const cityStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/cities"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadCity = multer({ storage: cityStorage });