document.addEventListener('DOMContentLoaded', function() {
    // Get user role and update UI accordingly
    const userRole = localStorage.getItem('userRole') || 'student';
    const roleType = document.getElementById('roleType');
    const profileName = document.getElementById('profileName');
    const userName = document.getElementById('userName');

    // Update profile based on role
    if (userRole === 'faculty') {
        roleType.textContent = 'Faculty';
        profileName.textContent = 'Dr. Jane Smith';
        userName.textContent = 'Dr. Jane Smith';
        updateFacultyUI();
    } else {
        roleType.textContent = 'Student';
        profileName.textContent = 'John Doe';
        userName.textContent = 'John Doe';
        updateStudentUI();
    }

    // Handle profile picture click
    const profilePic = document.querySelector('.profile-pic');
    profilePic.addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
});

function updateFacultyUI() {
    // Update UI elements specific to faculty
    const academicProgress = document.querySelector('.profile-section:nth-child(2)');
    if (academicProgress) {
        academicProgress.innerHTML = `
            <h2>Teaching Statistics</h2>
            <div class="progress-stats">
                <div class="stat-item">
                    <h3>Courses Teaching</h3>
                    <p class="stat-value">4</p>
                </div>
                <div class="stat-item">
                    <h3>Total Students</h3>
                    <p class="stat-value">120</p>
                </div>
                <div class="stat-item">
                    <h3>Average Rating</h3>
                    <p class="stat-value">4.8</p>
                </div>
            </div>
        `;
    }

    // Update personal information
    const personalInfo = document.querySelector('.info-grid');
    if (personalInfo) {
        personalInfo.innerHTML = `
            <div class="info-item">
                <label>Email</label>
                <p>jane.smith@mbu.edu</p>
            </div>
            <div class="info-item">
                <label>Faculty ID</label>
                <p>MBU-FAC-2024-101</p>
            </div>
            <div class="info-item">
                <label>Department</label>
                <p>Computer Science</p>
            </div>
            <div class="info-item">
                <label>Office</label>
                <p>Room 401, CS Building</p>
            </div>
        `;
    }
}

function updateStudentUI() {
    // Student UI is already set in the HTML
    // Add any additional student-specific UI updates here
}

// Handle logout
document.querySelector('a[href="landing.html"]').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'landing.html';
}); 