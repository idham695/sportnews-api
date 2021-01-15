import berita from "../controller/BeritaController";
import { Router } from "express";
import multer from "multer";
import authJwt from "../middleware/authJwt";

const router = Router();

const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Please upload only images", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images/berita");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});

router.post("/add_berita", authJwt.verifyToken, berita.create);
router.get("/get_all_berita", authJwt.verifyToken, berita.findAll);
router.get("/get_berita_by_slug/:slug", authJwt.verifyToken, berita.findOne);
router.put("/update_berita/:slug", authJwt.verifyToken, berita.update);
router.delete("/delete_berita/:slug", authJwt.verifyToken, berita.delete);

export default router;