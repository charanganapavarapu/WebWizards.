import React, { useState, useEffect } from 'react';
import { fetchAttendance, markAttendance, getAttendanceHistory } from '../../services/attendanceService';
import { showToast } from '../../utils/toast';
import './AttendanceSection.css';

const AttendanceSection = ({ courseId }) => {
    const [attendance, setAttendance] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadAttendance = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchAttendance(courseId);
            setAttendance(data);
            showToast('Attendance loaded successfully', 'success');
        } catch (error) {
            setError(error.message);
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const loadHistory = async () => {
        try {
            const data = await getAttendanceHistory(courseId);
            setHistory(data);
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handleMarkAttendance = async (status) => {
        try {
            setLoading(true);
            await markAttendance(courseId, status);
            showToast('Attendance marked successfully', 'success');
            await loadAttendance(); // Refresh attendance data
            await loadHistory(); // Refresh history
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (courseId) {
            loadAttendance();
            loadHistory();
        }
    }, [courseId]);

    if (loading) {
        return (
            <div className="attendance-section">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="attendance-section error">
                <p>{error}</p>
                <button onClick={loadAttendance} className="retry-button">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="attendance-section">
            <div className="attendance-header">
                <h2>Attendance</h2>
                <div className="attendance-actions">
                    <button
                        onClick={() => handleMarkAttendance('present')}
                        className="attendance-button present"
                        disabled={loading}
                    >
                        Present
                    </button>
                    <button
                        onClick={() => handleMarkAttendance('late')}
                        className="attendance-button late"
                        disabled={loading}
                    >
                        Late
                    </button>
                    <button
                        onClick={() => handleMarkAttendance('absent')}
                        className="attendance-button absent"
                        disabled={loading}
                    >
                        Absent
                    </button>
                </div>
            </div>

            <div className="attendance-status">
                <h3>Current Status</h3>
                {attendance ? (
                    <div className={`status-badge ${attendance.status}`}>
                        {attendance.status.toUpperCase()}
                    </div>
                ) : (
                    <p>No attendance marked for today</p>
                )}
            </div>

            <div className="attendance-history">
                <h3>History</h3>
                {history.length > 0 ? (
                    <div className="history-list">
                        {history.map((record) => (
                            <div key={record._id} className="history-item">
                                <span className={`status-dot ${record.status}`} />
                                <span className="date">
                                    {new Date(record.timestamp).toLocaleDateString()}
                                </span>
                                <span className="time">
                                    {new Date(record.timestamp).toLocaleTimeString()}
                                </span>
                                <span className={`status ${record.status}`}>
                                    {record.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No attendance history available</p>
                )}
            </div>
        </div>
    );
};

export default AttendanceSection; 