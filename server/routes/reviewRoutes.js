import { Router } from 'express';
import { getReviewsByOfferId, addReview } from '../controllers/reviewController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = new Router();

router.get('/:offerId', getReviewsByOfferId);
router.post('/:offerId', authenticateToken, addReview);

export default router;