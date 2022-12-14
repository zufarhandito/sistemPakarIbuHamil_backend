import express from "express";
import {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../controllers/Article/articleCategoryController.js"

const router = express.Router();

router.get('/',getCategory);
router.get('/:id',getCategoryById);
router.post('/',createCategory);
router.patch('/:id',updateCategory);
router.delete('/:id',deleteCategory);

export default router;