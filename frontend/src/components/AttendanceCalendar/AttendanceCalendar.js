import React, { useState, useEffect } from 'react';
import './AttendanceCalendar.css';

const AttendanceCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    // Generate calendar data
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const days = [];
        let dayCount = 1;

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            days.push({ day: '', isCurrentMonth: false });
        }

        // Add days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month, i);
            const isToday = currentDate.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && currentDate.toDateString() === selectedDate.toDateString();
            const attendanceStatus = attendanceData[currentDate.toISOString().split('T')[0]];

            days.push({
                day: i,
                isCurrentMonth: true,
                isToday,
                isSelected,
                attendanceStatus
            });
        }

        return days;
    };

    const handleDateClick = (day) => {
        if (day.isCurrentMonth) {
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day);
            setSelectedDate(newDate);
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleAttendanceUpdate = (status) => {
        if (selectedDate) {
            const dateKey = selectedDate.toISOString().split('T')[0];
            setAttendanceData(prev => ({
                ...prev,
                [dateKey]: status
            }));
        }
    };

    const days = getDaysInMonth(currentDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="attendance-calendar">
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="nav-button">
                    &lt;
                </button>
                <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={handleNextMonth} className="nav-button">
                    &gt;
                </button>
            </div>

            <div className="calendar-grid">
                {dayNames.map(day => (
                    <div key={day} className="day-header">{day}</div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${day.isCurrentMonth ? 'current-month' : ''} ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''} ${day.attendanceStatus ? `attendance-${day.attendanceStatus}` : ''}`}
                        onClick={() => handleDateClick(day)}
                    >
                        {day.day}
                        {day.attendanceStatus && (
                            <div className={`attendance-indicator ${day.attendanceStatus}`} />
                        )}
                    </div>
                ))}
            </div>

            {selectedDate && (
                <div className="attendance-controls">
                    <h3>Mark Attendance for {selectedDate.toLocaleDateString()}</h3>
                    <div className="attendance-buttons">
                        <button
                            className="present"
                            onClick={() => handleAttendanceUpdate('present')}
                        >
                            Present
                        </button>
                        <button
                            className="absent"
                            onClick={() => handleAttendanceUpdate('absent')}
                        >
                            Absent
                        </button>
                        <button
                            className="late"
                            onClick={() => handleAttendanceUpdate('late')}
                        >
                            Late
                        </button>
                    </div>
                </div>
            )}

            <div className="attendance-legend">
                <div className="legend-item">
                    <div className="attendance-indicator present" />
                    <span>Present</span>
                </div>
                <div className="legend-item">
                    <div className="attendance-indicator absent" />
                    <span>Absent</span>
                </div>
                <div className="legend-item">
                    <div className="attendance-indicator late" />
                    <span>Late</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCalendar; 