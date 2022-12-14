import express from "express";
import {
    getArticle,
    getArticleById,
    updateArticle,
    createArticle,
    deleteArticle
} from "../../controllers/Article/articleController.js";

const router = express.Router();

router.get('/',getArticle);
router.get('/:id',getArticleById);
router.post('/',createArticle);
router.patch('/:id',updateArticle);
router.delete('/:id',deleteArticle);

export default router;
