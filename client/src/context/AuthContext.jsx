import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios defaults
    axios.defaults.baseURL = 'http://localhost:3000/api';
    axios.defaults.withCredentials = true;

    useEffect(() => {
        // Check if user is logged in (persisted state handled by cookie, but we need to verify/fetch user info?)
        // In this basic version, we might just rely on local state or simple check.
        // For now, let's assume if we have a user in localStorage we use it, or fetch /me if we had that endpoint.
        // Since we don't have /me, we rely on login response setting the user.
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('/auth/login', { email, password });
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    };

    const register = async (email, password, username) => {
        const res = await axios.post('/auth/register', { email, password, username });
        // Set user state just like login does
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    };

    const logout = async () => {
        await axios.post('/auth/logout');
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
