import axios from 'axios';
import { API_URL } from '../config';

const handleServiceError = (error) => {
    if (error.response) {
        // Server responded with error status
        switch (error.response.status) {
            case 400:
                throw new Error('Invalid request. Please check your input.');
            case 401:
                throw new Error('Session expired. Please login again.');
            case 403:
                throw new Error('You do not have permission to perform this action.');
            case 404:
                throw new Error('Attendance record not found.');
            case 429:
                throw new Error('Too many requests. Please try again later.');
            case 500:
                throw new Error('Server error. Please try again later.');
            default:
                throw new Error(error.response.data?.message || 'An unexpected error occurred.');
        }
    } else if (error.request) {
        // Request made but no response received
        throw new Error('Network error. Please check your connection.');
    } else {
        // Error in request setup
        throw new Error('Failed to make request. Please try again.');
    }
};

export const fetchAttendance = async (courseId) => {
    try {
        if (!courseId) {
            throw new Error('Course ID is required');
        }

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.get(`${API_URL}/attendance/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: 5000 // 5 second timeout
        });

        if (!response.data) {
            throw new Error('No attendance data received');
        }

        return response.data;
    } catch (error) {
        handleServiceError(error);
    }
};

export const markAttendance = async (courseId, status) => {
    try {
        if (!courseId) {
            throw new Error('Course ID is required');
        }

        if (!status || !['present', 'absent', 'late'].includes(status)) {
            throw new Error('Invalid attendance status');
        }

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.post(
            `${API_URL}/attendance/${courseId}/mark`,
            { 
                status,
                timestamp: new Date().toISOString()
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );

        if (!response.data) {
            throw new Error('Failed to mark attendance');
        }

        return response.data;
    } catch (error) {
        handleServiceError(error);
    }
};

export const getAttendanceHistory = async (courseId) => {
    try {
        if (!courseId) {
            throw new Error('Course ID is required');
        }

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.get(`${API_URL}/attendance/${courseId}/history`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: 5000
        });

        if (!response.data) {
            throw new Error('No attendance history found');
        }

        return response.data;
    } catch (error) {
        handleServiceError(error);
    }
}; 