import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Analytics() {
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await axios.get('/analytics');
            setAnalytics(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-6xl mx-auto pt-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        <h1 className="text-3xl font-bold">Analytics</h1>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Target className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold">Total Cards</h3>
                        </div>
                        <p className="text-3xl font-bold">{analytics.totalCards}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border border-border rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-orange-500/10 rounded-lg">
                                <Calendar className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="font-semibold">Due Today</h3>
                        </div>
                        <p className="text-3xl font-bold">{analytics.cardsDueToday}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-card border border-border rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                            </div>
                            <h3 className="font-semibold">Avg Accuracy</h3>
                        </div>
                        <p className="text-3xl font-bold">{analytics.averageAccuracy}%</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-card border border-border rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Award className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="font-semibold">Quiz Sessions</h3>
                        </div>
                        <p className="text-3xl font-bold">{analytics.recentResults.length}</p>
                    </motion.div>
                </div>

                {/* Mastery Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border rounded-xl p-6 mb-8"
                >
                    <h2 className="text-xl font-bold mb-6">Mastery Distribution</h2>
                    <div className="space-y-4">
                        {analytics.masteryDistribution.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium">Box {item.box}</span>
                                    <span className="text-muted-foreground">{item.count} cards ({item.percentage}%)</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Quiz Results */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-card border border-border rounded-xl p-6"
                >
                    <h2 className="text-xl font-bold mb-6">Recent Quiz Sessions</h2>
                    {analytics.recentResults.length > 0 ? (
                        <div className="space-y-3">
                            {analytics.recentResults.map((result) => (
                                <div key={result.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                                    <div>
                                        <p className="font-medium">{result.score}/{result.total} correct</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(result.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {((result.score / result.total) * 100).toFixed(0)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">No quiz sessions yet</p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
