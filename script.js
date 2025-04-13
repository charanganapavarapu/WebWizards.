// Handle code editor functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Add event listeners
    setupEventListeners();

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'landing.html';
        return;
    }

    const userRole = localStorage.getItem('userRole') || 'student';
    updateDashboard(userRole);

    // Initialize code editor only for students
    if (userRole === 'student') {
        initializeCodeEditor();
    } else {
        // Hide code editor section for faculty
        const codeEditorSection = document.querySelector('.code-editor-section');
        if (codeEditorSection) {
            codeEditorSection.style.display = 'none';
        }
        // Remove code editor from navigation for faculty
        const codeEditorLink = document.querySelector('a[href="#code-editor"]');
        if (codeEditorLink) {
            codeEditorLink.parentElement.remove();
        }
        // Remove Learn to Earn from navigation for faculty
        const learnToEarnLink = document.querySelector('a[href="#learn-to-earn"]');
        if (learnToEarnLink) {
            learnToEarnLink.parentElement.remove();
        }
    }

    // Handle profile click with animation
    const profilePic = document.querySelector('.profile-pic');
    const userName = document.getElementById('userName');
    
    [profilePic, userName].forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 200);
        });
    });

    // Enhanced section navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link with animation
                    this.classList.add('active');
                    // Smooth scroll to section
                    section.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Enhanced logout with animation
    document.querySelector('a[href="landing.html"]').addEventListener('click', function(e) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(1.1)';
        setTimeout(() => {
            localStorage.removeItem('userRole');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'landing.html';
        }, 300);
    });
});

function initializePage() {
    // Initialize any necessary components
    initializeComponents();
}

function setupEventListeners() {
    // Add event listeners for navigation
    setupNavigation();
    
    // Add event listeners for interactive elements
    setupInteractiveElements();
}

function initializeComponents() {
    // Initialize components that need setup
}

function setupNavigation() {
    // Setup navigation functionality
}

function setupInteractiveElements() {
    // Setup interactive elements
}

function updateDashboard(role) {
    const userName = document.getElementById('userName');
    const quickStats = document.querySelector('.quick-stats');
    const roleSpecificContent = document.getElementById('role-specific-content');
    const mainContent = document.querySelector('.dashboard-content');

    // Update user name
    userName.textContent = role === 'faculty' ? 'Dr. Jane Smith' : 'John Doe';

    // Create section containers
    mainContent.innerHTML = `
        <h1>Welcome to MBU Learning Management System</h1>
        
        <div class="quick-stats">
            <!-- Stats will be dynamically updated based on role -->
        </div>

        <div id="dashboard" class="section">
            <div id="role-specific-content"></div>
        </div>

        <div id="attendance" class="section">
            <h2>Attendance Management</h2>
            ${role === 'faculty' ? getFacultyAttendanceContent() : getStudentAttendanceContent()}
        </div>

        <div id="assessments" class="section">
            <h2>Assessments</h2>
            ${role === 'faculty' ? getFacultyAssessmentsContent() : getStudentAssessmentsContent()}
        </div>

        ${role === 'student' ? `
        <div id="learn-to-earn" class="section">
            <h2>Learn to Earn</h2>
            <div class="learn-to-earn-container">
                <div class="token-balance">
                    <h3>Your Token Balance</h3>
                    <div class="balance-display">
                        <i class="fas fa-coins"></i>
                        <span id="tokenCount">0</span>
                    </div>
                </div>
                
                <div class="challenges-grid">
                    <div class="challenge-card">
                        <div class="challenge-header">
                            <h3>Python Basics</h3>
                            <span class="reward">+50 Tokens</span>
                        </div>
                        <p>Complete 5 basic Python programming challenges</p>
                        <div class="challenge-progress">
                            <div class="progress-bar" style="width: 0%"></div>
                            <span class="progress-text">0/5 Completed</span>
                        </div>
                        <button class="action-btn start-challenge">Start Challenge</button>
                    </div>

                    <div class="challenge-card">
                        <div class="challenge-header">
                            <h3>Data Structures</h3>
                            <span class="reward">+100 Tokens</span>
                        </div>
                        <p>Implement and solve problems using common data structures</p>
                        <div class="challenge-progress">
                            <div class="progress-bar" style="width: 0%"></div>
                            <span class="progress-text">0/8 Completed</span>
                        </div>
                        <button class="action-btn start-challenge">Start Challenge</button>
                    </div>

                    <div class="challenge-card">
                        <div class="challenge-header">
                            <h3>Algorithms</h3>
                            <span class="reward">+150 Tokens</span>
                        </div>
                        <p>Master sorting and searching algorithms</p>
                        <div class="challenge-progress">
                            <div class="progress-bar" style="width: 0%"></div>
                            <span class="progress-text">0/6 Completed</span>
                        </div>
                        <button class="action-btn start-challenge">Start Challenge</button>
                    </div>
                </div>

                <div class="rewards-section">
                    <h3>Redeem Your Tokens</h3>
                    <div class="rewards-grid">
                        <div class="reward-card">
                            <i class="fas fa-gift"></i>
                            <h4>Course Discount</h4>
                            <p>1000 Tokens</p>
                            <button class="action-btn redeem-btn">Redeem</button>
                        </div>
                        <div class="reward-card">
                            <i class="fas fa-certificate"></i>
                            <h4>Certificate</h4>
                            <p>500 Tokens</p>
                            <button class="action-btn redeem-btn">Redeem</button>
                        </div>
                        <div class="reward-card">
                            <i class="fas fa-book"></i>
                            <h4>Premium Content</h4>
                            <p>300 Tokens</p>
                            <button class="action-btn redeem-btn">Redeem</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        <div id="code-editor" class="section code-editor-section">
            <h2>Code Editor</h2>
            <div class="editor-container">
                <div class="language-selector">
                    <select id="language-select">
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>
                <textarea id="code-area" placeholder="Write your code here..."></textarea>
                <button class="run-btn"><i class="fas fa-play"></i> Run Code</button>
            </div>
        </div>

        <div id="resources" class="section">
            <h2>Learning Resources</h2>
            ${getResourcesContent()}
        </div>
    `;

    // Update quick stats based on role
    if (role === 'faculty') {
        quickStats.innerHTML = `
            <div class="stat-card">
                <i class="fas fa-chalkboard-teacher"></i>
                <h3>Active Courses</h3>
                <p>4</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-users"></i>
                <h3>Total Students</h3>
                <p>120</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-tasks"></i>
                <h3>Pending Assessments</h3>
                <p>8</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-star"></i>
                <h3>Average Rating</h3>
                <p>4.8</p>
            </div>
        `;

        roleSpecificContent.innerHTML = `
            <div class="section-container">
                <h2>Your Courses</h2>
                <div class="courses-grid">
                    <div class="course-card">
                        <h3>Advanced Programming</h3>
                        <p>CSE401 - 35 Students</p>
                        <div class="course-actions">
                            <button class="action-btn"><i class="fas fa-edit"></i> Manage</button>
                            <button class="action-btn"><i class="fas fa-chart-bar"></i> Analytics</button>
                        </div>
                    </div>
                    <div class="course-card">
                        <h3>Data Structures</h3>
                        <p>CSE301 - 42 Students</p>
                        <div class="course-actions">
                            <button class="action-btn"><i class="fas fa-edit"></i> Manage</button>
                            <button class="action-btn"><i class="fas fa-chart-bar"></i> Analytics</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        quickStats.innerHTML = `
            <div class="stat-card">
                <i class="fas fa-user-graduate"></i>
                <h3>Current Courses</h3>
                <p>6</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-clock"></i>
                <h3>Attendance</h3>
                <p>85%</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-code"></i>
                <h3>Code Submissions</h3>
                <p>12</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-chart-line"></i>
                <h3>Performance</h3>
                <p>92%</p>
            </div>
        `;

        roleSpecificContent.innerHTML = `
            <div class="section-container">
                <h2>Your Progress</h2>
                <div class="courses-grid">
                    <div class="course-card">
                        <h3>Advanced Programming</h3>
                        <p>CSE401 - Prof. Smith</p>
                        <div class="course-progress">
                            <div class="progress-bar" style="width: 75%"></div>
                        </div>
                        <p class="progress-text">75% Complete</p>
                    </div>
                    <div class="course-card">
                        <h3>Data Structures</h3>
                        <p>CSE301 - Prof. Johnson</p>
                        <div class="course-progress">
                            <div class="progress-bar" style="width: 60%"></div>
                        </div>
                        <p class="progress-text">60% Complete</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize code editor if student
    if (role === 'student') {
        initializeCodeEditor();
    }

    // Initialize Learn to Earn functionality if student
    if (role === 'student') {
        initializeLearnToEarn();
    }
}

function initializeCodeEditor() {
    const codeArea = document.getElementById('code-area');
    const languageSelect = document.getElementById('language-select');
    const runButton = document.querySelector('.run-btn');

    // Sample code templates for different languages
    const codeTemplates = {
        python: '# Python code here\nprint("Hello, World!")',
        java: '// Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        javascript: '// JavaScript code here\nconsole.log("Hello, World!");',
        cpp: '// C++ code here\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
    };

    // Update code template when language changes
    languageSelect.addEventListener('change', function() {
        codeArea.value = codeTemplates[this.value];
    });

    // Initialize with Python template
    codeArea.value = codeTemplates['python'];

    // Handle run button click (mock compilation)
    runButton.addEventListener('click', function() {
        // In a real implementation, this would send the code to a backend server
        alert('Code compilation feature will be implemented with backend integration.');
    });

    // Add tab support in textarea
    codeArea.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });
}

// Handle notifications
document.addEventListener('DOMContentLoaded', function() {
    const notificationBell = document.querySelector('.notifications');
    
    notificationBell.addEventListener('click', function() {
        alert('Notifications feature will be implemented in the next phase.');
    });
});

// Handle responsive sidebar
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
});

// Helper functions for section content
function getFacultyAttendanceContent() {
    return `
        <div class="attendance-management">
            <div class="course-selection">
                <select class="course-select">
                    <option value="">Select Course</option>
                    <option value="cse401">CSE401 - Advanced Programming</option>
                    <option value="cse301">CSE301 - Data Structures</option>
                </select>
            </div>
            <div class="attendance-stats">
                <div class="stat-card">
                    <h3>Average Attendance</h3>
                    <p>85%</p>
                </div>
                <div class="stat-card">
                    <h3>Last Session</h3>
                    <p>42/45 Present</p>
                </div>
            </div>
            <button class="action-btn"><i class="fas fa-plus"></i> Take Attendance</button>
        </div>
    `;
}

function getStudentAttendanceContent() {
    return `
        <div class="attendance-overview">
            <div class="attendance-stats">
                <div class="stat-card">
                    <h3>Overall Attendance</h3>
                    <p>85%</p>
                </div>
                <div class="stat-card">
                    <h3>Classes Attended</h3>
                    <p>42/45</p>
                </div>
            </div>
            <div class="attendance-calendar">
                <!-- Calendar implementation would go here -->
                <p>Attendance Calendar Coming Soon</p>
            </div>
        </div>
    `;
}

function getFacultyAssessmentsContent() {
    return `
        <div class="assessment-management">
            <div class="assessment-actions">
                <button class="action-btn"><i class="fas fa-plus"></i> Create Assessment</button>
                <button class="action-btn"><i class="fas fa-file-alt"></i> View Submissions</button>
            </div>
            <div class="pending-assessments">
                <h3>Pending Reviews</h3>
                <div class="assessment-list">
                    <div class="assessment-item">
                        <h4>Mid-term Project</h4>
                        <p>CSE401 - 15 submissions pending</p>
                    </div>
                    <div class="assessment-item">
                        <h4>Lab Assignment 3</h4>
                        <p>CSE301 - 8 submissions pending</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStudentAssessmentsContent() {
    return `
        <div class="assessment-overview">
            <div class="upcoming-assessments">
                <h3>Upcoming Deadlines</h3>
                <div class="assessment-list">
                    <div class="assessment-item">
                        <h4>Final Project</h4>
                        <p>Due: Next Week</p>
                    </div>
                    <div class="assessment-item">
                        <h4>Quiz 3</h4>
                        <p>Due: Tomorrow</p>
                    </div>
                </div>
            </div>
            <div class="assessment-history">
                <h3>Recent Submissions</h3>
                <div class="submission-list">
                    <div class="submission-item">
                        <h4>Lab Assignment 2</h4>
                        <p>Grade: 92/100</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getResourcesContent() {
    return `
        <div class="resources-section">
            <div class="resource-categories">
                <div class="resource-category">
                    <h3>Course Materials</h3>
                    <ul class="resource-list">
                        <li><i class="fas fa-file-pdf"></i> Lecture Notes</li>
                        <li><i class="fas fa-video"></i> Video Tutorials</li>
                        <li><i class="fas fa-book"></i> Reference Materials</li>
                    </ul>
                </div>
                <div class="resource-category">
                    <h3>External Resources</h3>
                    <ul class="resource-list">
                        <li><i class="fas fa-link"></i> Online Documentation</li>
                        <li><i class="fas fa-graduation-cap"></i> Practice Problems</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Add theme toggle functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = savedTheme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.innerHTML = newTheme === 'dark' ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        });
    }
}

// Enhance animations for elements
function initializeAnimations() {
    // Add intersection observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add hover effects for cards
    document.querySelectorAll('.stat-card, .course-card, .role-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Add smooth transitions for stat updates
function updateStatWithAnimation(element, newValue) {
    const currentValue = parseInt(element.textContent);
    const step = (newValue - currentValue) / 20;
    let current = currentValue;
    
    const animate = () => {
        current += step;
        element.textContent = Math.round(current);
        
        if ((step > 0 && current < newValue) || (step < 0 && current > newValue)) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = newValue;
        }
    };
    
    requestAnimationFrame(animate);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                          type === 'error' ? 'exclamation-circle' : 
                          'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add Learn to Earn initialization
function initializeLearnToEarn() {
    // Load the Learn to Earn script
    const script = document.createElement('script');
    script.src = 'learn-to-earn.js';
    document.body.appendChild(script);
} 