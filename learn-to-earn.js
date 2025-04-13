document.addEventListener('DOMContentLoaded', function() {
    // Initialize token balance
    initializeTokenBalance();
    
    // Initialize challenge progress
    initializeChallenges();
    
    // Add event listeners for challenge buttons
    setupChallengeButtons();
    
    // Add event listeners for redeem buttons
    setupRedeemButtons();
    
    // Add animation observer for cards
    setupAnimationObserver();
});

function initializeTokenBalance() {
    // Get token balance from localStorage or set default
    const tokenBalance = parseInt(localStorage.getItem('tokenBalance')) || 0;
    const tokenCount = document.getElementById('tokenCount');
    
    // Animate the token count
    animateValue(tokenCount, 0, tokenBalance, 1000);
}

function initializeChallenges() {
    // Get challenge progress from localStorage or set default
    const challenges = JSON.parse(localStorage.getItem('challenges')) || {
        'Python Basics': { completed: 0, total: 5, reward: 50 },
        'Data Structures': { completed: 0, total: 8, reward: 100 },
        'Algorithms': { completed: 0, total: 6, reward: 150 }
    };

    // Update progress bars and text
    Object.entries(challenges).forEach(([name, progress]) => {
        const card = document.querySelector(`.challenge-card h3:contains('${name}')`).closest('.challenge-card');
        const progressBar = card.querySelector('.progress-bar');
        const progressText = card.querySelector('.progress-text');
        
        const percentage = (progress.completed / progress.total) * 100;
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${progress.completed}/${progress.total} Completed`;
        
        // Update reward display
        const reward = card.querySelector('.reward');
        reward.innerHTML = `<i class="fas fa-coins"></i> +${progress.reward} Tokens`;
    });
}

function setupChallengeButtons() {
    document.querySelectorAll('.start-challenge').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.challenge-card');
            const challengeName = card.querySelector('h3').textContent;
            
            // Add loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading time
            setTimeout(() => {
                openChallenge(challengeName);
            }, 1000);
        });
    });
}

function setupRedeemButtons() {
    document.querySelectorAll('.redeem-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.reward-card');
            const rewardName = card.querySelector('h4').textContent;
            const cost = parseInt(card.querySelector('p').textContent);
            
            // Add loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            // Simulate processing time
            setTimeout(() => {
                redeemReward(rewardName, cost);
                this.innerHTML = '<i class="fas fa-check"></i> Redeem';
                this.disabled = false;
            }, 1500);
        });
    });
}

function setupAnimationObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.challenge-card, .reward-card').forEach(card => {
        observer.observe(card);
    });
}

function openChallenge(challengeName) {
    // Store current challenge in localStorage
    localStorage.setItem('currentChallenge', challengeName);
    
    // Show notification
    showNotification(`Opening ${challengeName} challenge...`, 'info');
    
    // Redirect to code editor
    window.location.href = '#code-editor';
}

function redeemReward(rewardName, cost) {
    const currentBalance = parseInt(localStorage.getItem('tokenBalance') || 0);
    
    if (currentBalance >= cost) {
        // Update token balance
        const newBalance = currentBalance - cost;
        localStorage.setItem('tokenBalance', newBalance);
        
        // Animate the token count
        const tokenCount = document.getElementById('tokenCount');
        animateValue(tokenCount, currentBalance, newBalance, 1000);
        
        // Show success notification
        showNotification(`Successfully redeemed ${rewardName}!`, 'success');
        
        // Handle reward
        handleRewardRedemption(rewardName);
    } else {
        showNotification('Not enough tokens! Complete more challenges to earn tokens.', 'error');
    }
}

function handleRewardRedemption(rewardName) {
    // This function would handle the actual reward redemption
    // For now, we'll just log it and show appropriate notifications
    switch(rewardName) {
        case 'Course Discount':
            showNotification('20% discount applied to your next course purchase!', 'success');
            break;
        case 'Certificate':
            showNotification('Certificate generated! Check your profile to download.', 'success');
            break;
        case 'Premium Content':
            showNotification('Premium content unlocked! Check the resources section.', 'success');
            break;
    }
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function showNotification(message, type) {
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

// Helper function to check if element contains text
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
}; 