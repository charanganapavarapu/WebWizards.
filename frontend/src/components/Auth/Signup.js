import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import './Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'student',
        studentId: '',
        department: '',
        facultyId: '',
        designation: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Common validations
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // User type specific validations
        if (formData.userType === 'student') {
            if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
            if (!formData.department.trim()) newErrors.department = 'Department is required';
        } else {
            if (!formData.facultyId.trim()) newErrors.facultyId = 'Faculty ID is required';
            if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        try {
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.userType,
                ...(formData.userType === 'student' 
                    ? { studentId: formData.studentId, department: formData.department }
                    : { facultyId: formData.facultyId, designation: formData.designation })
            };

            await register(userData);
            navigate(`/${formData.userType}/dashboard`);
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: error.message || 'Registration failed. Please try again.'
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Sign up as a {formData.userType}</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {errors.submit && (
                        <div className="error-message">{errors.submit}</div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                            placeholder="Enter your full name"
                            disabled={loading}
                        />
                        {errors.name && (
                            <span className="error-text">{errors.name}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                        {errors.email && (
                            <span className="error-text">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                        {errors.password && (
                            <span className="error-text">{errors.password}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="userType">User Type</label>
                        <select
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className={errors.userType ? 'error' : ''}
                            disabled={loading}
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>
                        {errors.userType && (
                            <span className="error-text">{errors.userType}</span>
                        )}
                    </div>

                    {formData.userType === 'student' ? (
                        <>
                            <div className="form-group">
                                <label htmlFor="studentId">Student ID</label>
                                <input
                                    type="text"
                                    id="studentId"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    className={errors.studentId ? 'error' : ''}
                                    placeholder="Enter your student ID"
                                    disabled={loading}
                                />
                                {errors.studentId && (
                                    <span className="error-text">{errors.studentId}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="department">Department</label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className={errors.department ? 'error' : ''}
                                    placeholder="Enter your department"
                                    disabled={loading}
                                />
                                {errors.department && (
                                    <span className="error-text">{errors.department}</span>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="facultyId">Faculty ID</label>
                                <input
                                    type="text"
                                    id="facultyId"
                                    name="facultyId"
                                    value={formData.facultyId}
                                    onChange={handleChange}
                                    className={errors.facultyId ? 'error' : ''}
                                    placeholder="Enter your faculty ID"
                                    disabled={loading}
                                />
                                {errors.facultyId && (
                                    <span className="error-text">{errors.facultyId}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="designation">Designation</label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className={errors.designation ? 'error' : ''}
                                    placeholder="Enter your designation"
                                    disabled={loading}
                                />
                                {errors.designation && (
                                    <span className="error-text">{errors.designation}</span>
                                )}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="auth-footer">
                        Already have an account?{' '}
                        <a href={`/login?type=${formData.userType}`}>Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup; 