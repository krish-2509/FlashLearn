import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    useEffect(() => {
        fetchQuizCards();
    }, []);

    const fetchQuizCards = async () => {
        try {
            const res = await axios.get('/quiz?limit=10');
            setCards(res.data.cards);
            if (res.data.cards.length === 0) {
                setQuizComplete(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAnswer = async (correct) => {
        try {
            await axios.post('/quiz/submit', {
                cardId: cards[currentIndex].id,
                correct
            });

            if (correct) setScore(score + 1);

            if (currentIndex + 1 < cards.length) {
                setCurrentIndex(currentIndex + 1);
                setShowAnswer(false);
            } else {
                // Save quiz session
                await axios.post('/quiz/session', {
                    score: correct ? score + 1 : score,
                    total: cards.length
                });
                setQuizComplete(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (quizComplete) {
        const percentage = cards.length > 0 ? ((score / cards.length) * 100).toFixed(0) : 0;
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center"
                >
                    <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
                    {cards.length > 0 ? (
                        <>
                            <div className="text-6xl font-bold text-primary mb-4">{percentage}%</div>
                            <p className="text-muted-foreground mb-6">
                                You got {score} out of {cards.length} correct
                            </p>
                        </>
                    ) : (
                        <p className="text-muted-foreground mb-6">No cards due for review right now!</p>
                    )}
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Back to Dashboard
                    </button>
                </motion.div>
            </div>
        );
    }

    if (cards.length === 0) {
        return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
    }

    const currentCard = cards[currentIndex];

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-2xl mx-auto pt-8">
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <div className="text-sm text-muted-foreground">
                        Card {currentIndex + 1} of {cards.length}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="bg-card border border-border rounded-xl p-8 min-h-[300px] flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Question:</h3>
                            <p className="text-lg mb-6">{currentCard.question}</p>

                            {showAnswer && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 pt-6 border-t border-border"
                                >
                                    <h3 className="text-xl font-semibold mb-4">Answer:</h3>
                                    <p className="text-lg text-muted-foreground">{currentCard.answer}</p>
                                </motion.div>
                            )}
                        </div>

                        <div className="mt-8">
                            {!showAnswer ? (
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Show Answer
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleAnswer(false)}
                                        className="flex-1 bg-destructive text-destructive-foreground py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    >
                                        <X className="w-5 h-5" /> Incorrect
                                    </button>
                                    <button
                                        onClick={() => handleAnswer(true)}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-5 h-5" /> Correct
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
