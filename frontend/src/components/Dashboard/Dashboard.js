import React from 'react';
import './Dashboard.css';
import AttendanceCalendar from '../AttendanceCalendar/AttendanceCalendar';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
            </div>
            
            <div className="dashboard-content">
                <div className="dashboard-section">
                    <h2>Attendance Calendar</h2>
                    <AttendanceCalendar />
                </div>
                
                {/* Other dashboard sections */}
                <div className="dashboard-section">
                    <h2>Recent Activities</h2>
                    {/* Add recent activities content */}
                </div>
                
                <div className="dashboard-section">
                    <h2>Upcoming Events</h2>
                    {/* Add upcoming events content */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 