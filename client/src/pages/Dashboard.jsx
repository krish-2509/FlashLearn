import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Plus, Trash2, Search, BarChart3, Brain, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '../components/ProfileDropdown';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCard, setNewCard] = useState({ question: '', answer: '', tags: '' });

    // Filter & Pagination state
    const [search, setSearch] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState(null);

    useEffect(() => {
        fetchFlashcards();
    }, [search, tagFilter, sortBy, sortOrder, page]);

    const fetchFlashcards = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page,
                limit: 9,
                ...(search && { search }),
                ...(tagFilter && { tag: tagFilter }),
                sortBy,
                sortOrder
            });

            const res = await axios.get(`/flashcards?${params}`);
            setFlashcards(res.data.data);
            setMeta(res.data.meta);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/flashcards', newCard);
            setNewCard({ question: '', answer: '', tags: '' });
            setIsModalOpen(false);
            setPage(1);
            fetchFlashcards();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await axios.delete(`/flashcards/${id}`);
            fetchFlashcards();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10 w-full">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">FlashLearn</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate('/quiz')}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg transition-colors"
                        >
                            <Brain className="w-4 h-4" />
                            <span className="hidden sm:inline">Quiz</span>
                        </button>
                        <button
                            onClick={() => navigate('/analytics')}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg transition-colors"
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span className="hidden sm:inline">Analytics</span>
                        </button>
                        <ProfileDropdown />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold">My Flashcards</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-md"
                    >
                        <Plus className="w-4 h-4" /> New Card
                    </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search cards..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full pl-10 pr-3 py-2 rounded-md border border-input bg-background"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Filter by tag..."
                        value={tagFilter}
                        onChange={(e) => { setTagFilter(e.target.value); setPage(1); }}
                        className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    />

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    >
                        <option value="createdAt">Sort by Date</option>
                        <option value="question">Sort by Question</option>
                        <option value="nextReviewDate">Sort by Review Date</option>
                        <option value="box">Sort by Mastery</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">Loading...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <AnimatePresence>
                                {flashcards.map((card) => (
                                    <motion.div
                                        key={card.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        layout
                                        className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
                                    >
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleDelete(card.id)} className="p-1 hover:text-destructive transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Box {card.box}</span>
                                        </div>

                                        <h3 className="font-semibold text-lg mb-2">{card.question}</h3>
                                        <div className="w-full h-px bg-border my-3" />
                                        <p className="text-muted-foreground">{card.answer}</p>

                                        {card.tags && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {card.tags.split(',').map((tag, i) => (
                                                    <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{tag.trim()}</span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {flashcards.length === 0 && (
                                <div className="col-span-full text-center py-20 text-muted-foreground">
                                    {search || tagFilter ? 'No flashcards match your filters.' : 'No flashcards yet. Create your first one!'}
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {meta && meta.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <span className="text-sm text-muted-foreground">
                                    Page {meta.page} of {meta.totalPages}
                                </span>

                                <button
                                    onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                                    disabled={page === meta.totalPages}
                                    className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Create Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="bg-card w-full max-w-lg rounded-xl shadow-xl border border-border p-6"
                        >
                            <h3 className="text-xl font-bold mb-4">Create New Flashcard</h3>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Question</label>
                                    <input
                                        required
                                        value={newCard.question}
                                        onChange={e => setNewCard({ ...newCard, question: e.target.value })}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Answer</label>
                                    <textarea
                                        required
                                        value={newCard.answer}
                                        onChange={e => setNewCard({ ...newCard, answer: e.target.value })}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                    <input
                                        value={newCard.tags}
                                        onChange={e => setNewCard({ ...newCard, tags: e.target.value })}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                                        placeholder="math, algebra, formula"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded-md hover:bg-accent transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
