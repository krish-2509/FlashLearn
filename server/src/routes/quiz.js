import express from 'express';
import { getQuiz, submitQuizResult, getAnalytics, saveQuizSession } from '../controllers/quizController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/quiz', getQuiz);
router.post('/quiz/submit', submitQuizResult);
router.get('/analytics', getAnalytics);
router.post('/quiz/session', saveQuizSession);

export default router;
