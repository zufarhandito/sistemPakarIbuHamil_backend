import express from "express";
import multer from "multer";
// const upload = multer({dest:'images/'})
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    upload
} from "../controllers/userController.js";

const router = express.Router();

router.get('/',getUser);
router.get('/:id',getUserById);
router.post('/',upload,createUser);
router.patch('/:id',upload,updateUser);
router.delete('/:id',deleteUser);

export default router;

