import express from "express";
import {
    getGejala,
    getGejalaById,
    createGejala,
    updateGejala,
    deleteGejala
} from "../controllers/gejalaController.js";

const router = express.Router();

router.get('/',getGejala);
router.get('/:id',getGejalaById);
router.post('/',createGejala);
router.patch('/:id',updateGejala);
router.delete('/:id',deleteGejala);

export default router;

