import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios defaults
    axios.defaults.baseURL = 'https://flashlearn-tp14.onrender.com/api';
    axios.defaults.withCredentials = true;

    // Add request interceptor to include token in Authorization header
    axios.interceptors.request.use(
        (config) => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                // The token is stored in the response, we need to get it from localStorage
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

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
        localStorage.setItem('token', res.data.token);
        return res.data;
    };

    const register = async (email, password, username) => {
        const res = await axios.post('/auth/register', { email, password, username });
        // Set user state just like login does
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        return res.data;
    };

    const logout = async () => {
        await axios.post('/auth/logout');
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
