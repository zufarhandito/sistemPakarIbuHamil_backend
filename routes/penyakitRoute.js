import express from "express";
import {
    getPenyakit,
    getPenyakitById,
    createPenyakit,
    updatePenyakit,
    deletePenyakit
} from "../controllers/penyakitController.js";

const router = express.Router();

router.get('/',getPenyakit);
router.get('/:id',getPenyakitById);
router.post('/',createPenyakit);
router.patch('/:id',updatePenyakit);
router.delete('/:id',deletePenyakit);

export default router;

