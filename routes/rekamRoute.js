import express from "express";
import {
    getRekam,
    getRekamById,
    createRekam,
    updateRekam,
    deleteRekam
} from "../controllers/rekamController.js";

const router = express.Router();

router.get('/',getRekam);
router.get('/:id',getRekamById);
router.post('/',createRekam);
router.patch('/:id',updateRekam);
router.delete('/:id',deleteRekam);


export default router;

