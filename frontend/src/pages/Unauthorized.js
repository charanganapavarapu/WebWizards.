import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Unauthorized = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleLoginWithDifferentAccount = async () => {
        try {
            await logout();
            navigate('/login', { 
                state: { 
                    from: location.state?.from || '/',
                    message: 'Please login with appropriate credentials'
                } 
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="unauthorized-container">
            <div className="unauthorized-content">
                <h1>Access Denied</h1>
                <p>You do not have permission to access this page.</p>
                <div className="unauthorized-actions">
                    <button 
                        onClick={handleGoHome}
                        className="btn btn-primary"
                    >
                        Go to Home
                    </button>
                    <button 
                        onClick={handleLoginWithDifferentAccount}
                        className="btn btn-secondary"
                    >
                        Login with Different Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized; 