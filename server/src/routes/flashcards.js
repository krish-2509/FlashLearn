import express from 'express';
import { getFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '../controllers/flashcardController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getFlashcards);
router.post('/', createFlashcard);
router.put('/:id', updateFlashcard);
router.delete('/:id', deleteFlashcard);

export default router;
