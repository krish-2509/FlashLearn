import prisma from '../utils/prismaClient.js';

const getFlashcards = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            tag,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        const skip = (page - 1) * limit;

        // Build where clause with multiple filters
        const where = {
            userId: req.user.userId,
            ...(tag && { tags: { contains: tag } }),
            ...(search && {
                OR: [
                    { question: { contains: search } },
                    { answer: { contains: search } }
                ]
            })
        };

        // Validate sortBy field
        const validSortFields = ['createdAt', 'question', 'nextReviewDate', 'box'];
        const orderByField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const orderByDirection = sortOrder === 'asc' ? 'asc' : 'desc';

        const flashcards = await prisma.flashcard.findMany({
            where,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { [orderByField]: orderByDirection }
        });

        const total = await prisma.flashcard.count({ where });

        res.json({
            data: flashcards,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
                hasMore: skip + flashcards.length < total
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching flashcards' });
    }
};

const createFlashcard = async (req, res) => {
    try {
        const { question, answer, tags } = req.body;
        const flashcard = await prisma.flashcard.create({
            data: {
                question,
                answer,
                tags: tags || '',
                userId: req.user.userId
            }
        });
        res.status(201).json(flashcard);
    } catch (error) {
        res.status(500).json({ error: 'Error creating flashcard' });
    }
};

const updateFlashcard = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, tags } = req.body;

        // Ensure ownership
        const existing = await prisma.flashcard.findUnique({ where: { id } });
        if (!existing || existing.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updated = await prisma.flashcard.update({
            where: { id },
            data: { question, answer, tags }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error updating flashcard' });
    }
};

const deleteFlashcard = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure ownership
        const existing = await prisma.flashcard.findUnique({ where: { id } });
        if (!existing || existing.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await prisma.flashcard.delete({ where: { id } });
        res.json({ message: 'Flashcard deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting flashcard' });
    }
};

export { getFlashcards, createFlashcard, updateFlashcard, deleteFlashcard };
