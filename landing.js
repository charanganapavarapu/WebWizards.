// Handle role selection
function selectRole(role) {
    // Store the selected role in localStorage
    localStorage.setItem('userRole', role);
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect to the main dashboard
    window.location.href = 'index.html';
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }
}); 