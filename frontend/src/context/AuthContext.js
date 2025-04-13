import React, { createContext, useState, useEffect, useCallback } from 'react';
import AuthService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loadUser = useCallback(async () => {
        try {
            if (AuthService.isAuthenticated()) {
                const userData = await AuthService.getCurrentUser();
                setUser(userData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Failed to load user:', error);
            setError(error.message);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            const { user, token } = await AuthService.login(email, password);
            setUser(user);
            setIsAuthenticated(true);
            return user;
        } catch (error) {
            setError(error.message);
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            setLoading(true);
            const { user, token } = await AuthService.register(userData);
            setUser(user);
            setIsAuthenticated(true);
            return user;
        } catch (error) {
            setError(error.message);
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await AuthService.logout();
            setUser(null);
            setIsAuthenticated(false);
            setError(null);
        } catch (error) {
            console.error('Logout error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 