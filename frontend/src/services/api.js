const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.token = null;
    }

    setAuthToken(token) {
        this.token = token;
    }

    removeAuthToken() {
        this.token = null;
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    async handleResponse(response) {
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                this.removeAuthToken();
                localStorage.removeItem('token');
                throw new Error('Session expired. Please login again.');
            }
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    }

    async handleError(error) {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    throw new Error('Invalid request. Please check your input.');
                case 401:
                    throw new Error('Session expired. Please login again.');
                case 403:
                    throw new Error('You do not have permission to perform this action.');
                case 404:
                    throw new Error('Resource not found.');
                case 429:
                    throw new Error('Too many requests. Please try again later.');
                case 500:
                    throw new Error('Server error. Please try again later.');
                default:
                    throw new Error(error.response.data?.message || 'An unexpected error occurred.');
            }
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('Failed to make request. Please try again.');
        }
    }

    // Auth endpoints
    auth = {
        login: async (credentials) => {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: JSON.stringify(credentials),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
        register: async (userData) => {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: JSON.stringify(userData),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
        logout: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
    };

    // User endpoints
    user = {
        getProfile: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/user/profile`, {
                    headers: this.getHeaders(),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
        updateProfile: async (profileData) => {
            try {
                const response = await fetch(`${API_BASE_URL}/user/profile`, {
                    method: 'PUT',
                    headers: this.getHeaders(),
                    body: JSON.stringify(profileData),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
    };

    // Coding challenges endpoints
    challenges = {
        getAll: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/coding-challenges`, {
                    headers: this.getHeaders(),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
        getById: async (id) => {
            try {
                const response = await fetch(`${API_BASE_URL}/coding-challenges/${id}`, {
                    headers: this.getHeaders(),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
        runCode: async (data) => {
            try {
                const response = await fetch(`${API_BASE_URL}/coding-challenges/run`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: JSON.stringify(data),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
        submitSolution: async (id, code) => {
            try {
                const response = await fetch(`${API_BASE_URL}/coding-challenges/${id}/submit`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: JSON.stringify({ code }),
                });
                return this.handleResponse(response);
            } catch (error) {
                this.handleError(error);
            }
        },
        getHints: async (id) => {
            const response = await fetch(`${API_BASE_URL}/coding-challenges/${id}/hints`, {
                headers: this.getHeaders(),
            });
            return this.handleResponse(response);
        },
    };

    // AI endpoints
    ai = {
        assist: async (prompt) => {
            const response = await fetch(`${API_BASE_URL}/ai/assist`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ prompt }),
            });
            return this.handleResponse(response);
        },
        completeCode: async (code, type, language) => {
            const response = await fetch(`${API_BASE_URL}/ai/complete`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ code, type, language }),
            });
            return this.handleResponse(response);
        },
    };
}

export const api = new ApiService(); 