import express from "express";
import {
    login,
    logout,
    me
} from "../../controllers/Auth/authController.js"

const router = express.Router();

router.post('/login',login);
router.delete('/logout',logout);
router.get('/me',me)

export default router;