import { showToast } from '../../utils/toast';
import { fetchAttendance, markAttendance } from '../../services/attendanceService';
import { fetchCourses } from '../../services/courseService';
import { fetchAssessments } from '../../services/assessmentService';
import { fetchAchievements } from '../../services/achievementService';

export const handleAttendanceClick = async (courseId) => {
    try {
        const attendance = await fetchAttendance(courseId);
        if (attendance) {
            // Show attendance modal with current status
            showToast('Attendance record loaded', 'success');
            return attendance;
        }
    } catch (error) {
        showToast('Failed to load attendance', 'error');
    }
};

export const handleMarkAttendance = async (courseId, status) => {
    try {
        await markAttendance(courseId, status);
        showToast('Attendance marked successfully', 'success');
        return true;
    } catch (error) {
        showToast('Failed to mark attendance', 'error');
        return false;
    }
};

export const handleCourseClick = async (courseId) => {
    try {
        const course = await fetchCourses(courseId);
        if (course) {
            // Navigate to course details or show course modal
            showToast('Course details loaded', 'success');
            return course;
        }
    } catch (error) {
        showToast('Failed to load course details', 'error');
    }
};

export const handleAssessmentClick = async (assessmentId) => {
    try {
        const assessment = await fetchAssessments(assessmentId);
        if (assessment) {
            // Show assessment modal or navigate to assessment page
            showToast('Assessment loaded', 'success');
            return assessment;
        }
    } catch (error) {
        showToast('Failed to load assessment', 'error');
    }
};

export const handleAchievementClick = async (achievementId) => {
    try {
        const achievement = await fetchAchievements(achievementId);
        if (achievement) {
            // Show achievement details modal
            showToast('Achievement details loaded', 'success');
            return achievement;
        }
    } catch (error) {
        showToast('Failed to load achievement details', 'error');
    }
};

export const handleTokenBalanceClick = () => {
    // Show token transaction history or token details modal
    showToast('Token details loaded', 'success');
};

export const handleProfileClick = () => {
    // Navigate to profile page or show profile modal
    showToast('Profile loaded', 'success');
};

export const handleNotificationClick = (notificationId) => {
    // Mark notification as read and show details
    showToast('Notification details loaded', 'success');
};

export const handleLogoutClick = () => {
    // Clear local storage and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    showToast('Logged out successfully', 'success');
}; 