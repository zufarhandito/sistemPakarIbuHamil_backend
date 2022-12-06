import express from "express";
import {
    hitungCF,
    getGejala
} from "../controllers/diagnosisController.js";

const router = express.Router();

router.post('/',hitungCF);
router.get('/gejalas',getGejala)

export default router;