import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaChartLine, FaBook, FaAward, FaBell, FaCog } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [notifications, setNotifications] = useState([]);
    const [progress, setProgress] = useState({
        completed: 0,
        inProgress: 0,
        total: 0
    });

    useEffect(() => {
        // Simulate fetching user progress
        setProgress({
            completed: 5,
            inProgress: 3,
            total: 10
        });

        // Simulate notifications
        setNotifications([
            { id: 1, message: 'New challenge available!', type: 'challenge', read: false },
            { id: 2, message: 'You earned 100 points!', type: 'reward', read: false },
            { id: 3, message: 'Your profile is 80% complete', type: 'profile', read: true }
        ]);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const markNotificationAsRead = (id) => {
        setNotifications(notifications.map(notification => 
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const calculateProgressPercentage = () => {
        return (progress.completed / progress.total) * 100;
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>Welcome, {user?.username}</h1>
                    <p className="user-role">{user?.role}</p>
                </div>
                <div className="header-right">
                    <button className="notification-button">
                        <FaBell />
                        {notifications.filter(n => !n.read).length > 0 && (
                            <span className="notification-badge">
                                {notifications.filter(n => !n.read).length}
                            </span>
                        )}
                    </button>
                    <button className="settings-button">
                        <FaCog />
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-tabs">
                <button 
                    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`tab-button ${activeTab === 'challenges' ? 'active' : ''}`}
                    onClick={() => setActiveTab('challenges')}
                >
                    Challenges
                </button>
                <button 
                    className={`tab-button ${activeTab === 'rewards' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rewards')}
                >
                    Rewards
                </button>
                <button 
                    className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
            </div>

            <main className="dashboard-content">
                <section className="user-info">
                    <h2>Your Progress</h2>
                    <div className="progress-card">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ width: `${calculateProgressPercentage()}%` }}
                            ></div>
                        </div>
                        <div className="progress-stats">
                            <div className="stat">
                                <span className="stat-value">{progress.completed}</span>
                                <span className="stat-label">Completed</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{progress.inProgress}</span>
                                <span className="stat-label">In Progress</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{progress.total}</span>
                                <span className="stat-label">Total</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button 
                            className="action-button"
                            onClick={() => navigate('/challenges')}
                        >
                            <FaBook /> View Challenges
                        </button>
                        <button 
                            className="action-button"
                            onClick={() => navigate('/rewards')}
                        >
                            <FaAward /> View Rewards
                        </button>
                        <button 
                            className="action-button"
                            onClick={() => navigate('/profile')}
                        >
                            <FaCog /> Edit Profile
                        </button>
                    </div>
                </section>

                <section className="achievements">
                    <h2>Recent Achievements</h2>
                    <div className="achievement-list">
                        <div className="achievement-card">
                            <FaTrophy className="achievement-icon" />
                            <div className="achievement-details">
                                <h3>First Challenge</h3>
                                <p>Completed your first coding challenge</p>
                                <span className="achievement-date">2 days ago</span>
                            </div>
                        </div>
                        <div className="achievement-card">
                            <FaChartLine className="achievement-icon" />
                            <div className="achievement-details">
                                <h3>Quick Learner</h3>
                                <p>Completed 5 challenges in one week</p>
                                <span className="achievement-date">1 week ago</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="notifications">
                    <h2>Notifications</h2>
                    <div className="notification-list">
                        {notifications.map(notification => (
                            <div 
                                key={notification.id} 
                                className={`notification-item ${notification.read ? 'read' : ''}`}
                                onClick={() => markNotificationAsRead(notification.id)}
                            >
                                <div className="notification-content">
                                    <p>{notification.message}</p>
                                    <span className="notification-type">{notification.type}</span>
                                </div>
                                {!notification.read && <div className="notification-dot"></div>}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard; 