import berita from "../controller/BeritaController";
import { Router } from "express";
import authJwt from "../middleware/authJwt";

const router = Router();

router.post("/add_berita", berita.create);
router.get("/get_all_berita", berita.findAll);
router.get("/get_berita_by_id/:id", berita.findOne);
router.put("/update_berita/:id", berita.update);
router.delete("/delete_berita/:id", berita.delete);

export default router;