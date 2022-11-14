import express from "express";
import {
    getAturan,
    getAturanById,
    createAturan,
    updateAturan,
    deleteAturan
} from "../controllers/aturanController.js";

const router = express.Router();

router.get('/',getAturan);
router.get('/:id',getAturanById);
router.post('/',createAturan);
router.patch('/:id',updateAturan);
router.delete('/:id',deleteAturan);

export default router;

