import express from "express";
import {
    login,
    register,
    logout,
    me
} from "../../controllers/Auth/authController.js"

const router = express.Router();

router.post('/login',login);
router.post('/register',register);
router.delete('/logout',logout);
router.get('/me',me)

export default router;