async function loadLayout() {
    try {
        // Load header
        const headerRes = await fetch('components/header.html');
        const headerHtml = await headerRes.text();
        document.getElementById('header-placeholder').innerHTML = headerHtml;

        // Load footer
        const footerRes = await fetch('components/footer.html');
        const footerHtml = await footerRes.text();
        document.getElementById('footer-placeholder').innerHTML = footerHtml;

        // Toggle navbar buttons after header loads
        toggleNavbarButtons();
    } catch (error) {
        console.error("Error loading layout components:", error);
    }
}

function toggleNavbarButtons() {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole') || '';
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const email = (user.email || '').toLowerCase();

    const signinBtn = document.querySelector('.btn-login.signin');
    const signupBtn = document.querySelector('.btn-login.signup'); // Sign Up button
    const logoutBtn = document.querySelector('.btn-login.btn-logout');
    const studentBtn = document.querySelector('.student-dashboard');
    const adminBtn = document.querySelector('.admin-dashboard');

    // Show/hide Sign In (only for guests)
    if (signinBtn) {
        signinBtn.style.display = loggedIn ? 'none' : 'flex';
    }

    // Show/hide Sign Up (only for guests)
    if (signupBtn) {
        signupBtn.style.display = loggedIn ? 'none' : 'flex';
    }

    // Show/hide Logout (only for logged-in users)
    if (logoutBtn) {
        logoutBtn.style.display = loggedIn ? 'flex' : 'none';

        // Attach logout functionality once
        if (!logoutBtn.dataset.initialized) {
            logoutBtn.dataset.initialized = 'true';
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.clear();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userRole');
                localStorage.removeItem('currentUser');
                toggleNavbarButtons(); // Update navbar immediately
                window.location.href = 'login.html';
            });
        }
    }

    // Show/hide Student Dashboard (any logged-in user)
    if (studentBtn) studentBtn.style.display = loggedIn ? 'flex' : 'none';

    // Show/hide Admin Dashboard (only admin users)
    if (adminBtn) {
        adminBtn.style.display = (loggedIn && (role === 'admin' || email.includes('admin'))) ? 'flex' : 'none';
    }
}

// Run layout
loadLayout();
