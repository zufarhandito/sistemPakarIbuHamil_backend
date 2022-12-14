import express from "express";
import {
    getFeedback,
    createFeedback,
    deleteFeedback
} from "../controllers/feedbackController.js"

const router = express.Router();

router.get('/',getFeedback);
router.delete('/:id',deleteFeedback);
router.post('/',createFeedback);

export default router;