import express from "express";
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
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router;

