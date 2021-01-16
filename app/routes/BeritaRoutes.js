import berita from "../controller/BeritaController";
import { Router } from "express";
import authJwt from "../middleware/authJwt";

const router = Router();

router.post("/add_berita", authJwt.verifyToken, berita.create);
router.get("/get_all_berita", authJwt.verifyToken, berita.findAll);
router.get("/get_berita_by_id/:id", authJwt.verifyToken, berita.findOne);
router.put("/update_berita/:id", authJwt.verifyToken, berita.update);
router.delete("/delete_berita/:id", authJwt.verifyToken, berita.delete);

export default router;