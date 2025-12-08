import prisma from '../utils/prismaClient.js';

// Get quiz session with spaced repetition logic
const getQuiz = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const userId = req.user.userId;

        // Get flashcards due for review (Leitner system)
        const now = new Date();
        const dueCards = await prisma.flashcard.findMany({
            where: {
                userId,
                nextReviewDate: {
                    lte: now
                }
            },
            take: parseInt(limit),
            orderBy: { nextReviewDate: 'asc' }
        });

        res.json({
            cards: dueCards,
            count: dueCards.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching quiz cards' });
    }
};

// Submit quiz result and update card intervals
const submitQuizResult = async (req, res) => {
    try {
        const { cardId, correct } = req.body;
        const userId = req.user.userId;

        // Verify ownership
        const card = await prisma.flashcard.findUnique({ where: { id: cardId } });
        if (!card || card.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        // Leitner system logic
        let newBox = card.box;
        let daysToAdd = 1;

        if (correct) {
            // Move to next box (max 5)
            newBox = Math.min(card.box + 1, 5);
            // Exponential spacing: box 1=1 day, box 2=2 days, box 3=4 days, box 4=8 days, box 5=16 days
            daysToAdd = Math.pow(2, newBox - 1);
        } else {
            // Move back to box 1
            newBox = 1;
            daysToAdd = 1;
        }

        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);

        // Update card
        const updatedCard = await prisma.flashcard.update({
            where: { id: cardId },
            data: {
                box: newBox,
                nextReviewDate
            }
        });

        res.json({
            success: true,
            card: updatedCard,
            message: correct ? 'Correct! Card moved forward.' : 'Incorrect. Card reset to box 1.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error submitting quiz result' });
    }
};

// Get analytics for user
const getAnalytics = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Total cards
        const totalCards = await prisma.flashcard.count({ where: { userId } });

        // Cards by box (mastery level)
        const cardsByBox = await prisma.flashcard.groupBy({
            by: ['box'],
            where: { userId },
            _count: { box: true }
        });

        // Cards due today
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const cardsDueToday = await prisma.flashcard.count({
            where: {
                userId,
                nextReviewDate: {
                    lte: endOfDay
                }
            }
        });

        // Recent quiz results
        const recentResults = await prisma.quizResult.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        // Calculate average accuracy
        const totalQuizzes = recentResults.length;
        const averageAccuracy = totalQuizzes > 0
            ? (recentResults.reduce((sum, r) => sum + (r.score / r.total), 0) / totalQuizzes) * 100
            : 0;

        res.json({
            totalCards,
            cardsDueToday,
            cardsByBox: cardsByBox.reduce((acc, item) => {
                acc[`box${item.box}`] = item._count.box;
                return acc;
            }, {}),
            recentResults,
            averageAccuracy: averageAccuracy.toFixed(1),
            masteryDistribution: cardsByBox.map(item => ({
                box: item.box,
                count: item._count.box,
                percentage: ((item._count.box / totalCards) * 100).toFixed(1)
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching analytics' });
    }
};

// Save quiz session result
const saveQuizSession = async (req, res) => {
    try {
        const { score, total } = req.body;
        const userId = req.user.userId;

        const result = await prisma.quizResult.create({
            data: {
                userId,
                score,
                total
            }
        });

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving quiz session' });
    }
};

export { getQuiz, submitQuizResult, getAnalytics, saveQuizSession };
