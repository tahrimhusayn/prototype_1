// ==============================
// Common Helpers
// ==============================
function showError(input, message) {
    let error = input.parentElement.querySelector(".error-msg");

    if (!error) {
        error = document.createElement("small");
        error.className = "error-msg";
        input.parentElement.appendChild(error);
    }

    error.innerText = message;
    input.classList.add("error");
}

function clearError(input) {
    const error = input.parentElement.querySelector(".error-msg");
    if (error) error.remove();
    input.classList.remove("error");
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==============================
// Signup Validation
// ==============================
const signupForm = document.querySelector(".signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = signupForm.querySelector('input[type="text"]');
        const email = signupForm.querySelector('input[type="email"]');
        const password = signupForm.querySelectorAll('input[type="password"]')[0];
        const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1];

        let isValid = true;

        // Name
        if (name.value.trim().length < 3) {
            showError(name, "Name must be at least 3 characters");
            isValid = false;
        } else {
            clearError(name);
        }

        // Email
        if (!isValidEmail(email.value.trim())) {
            showError(email, "Enter a valid email address");
            isValid = false;
        } else {
            clearError(email);
        }

        // Password
        if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters");
            isValid = false;
        } else {
            clearError(password);
        }

        // Confirm Password
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Passwords do not match");
            isValid = false;
        } else {
            clearError(confirmPassword);
        }

        // ✅ Redirect after successful signup
        if (isValid) {
            // Use SESSION for page protection
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("userEmail", email.value.trim());

            // Optional: store in localStorage for persistence across reloads
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userEmail", email.value.trim());

            window.location.href = "dashboard.html";
        }
    });
}

// ==============================
// Login Validation
// ==============================
const loginForm = document.querySelector(".login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]');
        const password = loginForm.querySelector('input[type="password"]');

        let isValid = true;

        // Email
        if (!isValidEmail(email.value.trim())) {
            showError(email, "Invalid email address");
            isValid = false;
        } else {
            clearError(email);
        }

        // Password
        if (password.value.trim() === "") {
            showError(password, "Password cannot be empty");
            isValid = false;
        } else {
            clearError(password);
        }

        // ✅ Redirect after successful login
        if (isValid) {
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("userEmail", email.value.trim());

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userEmail", email.value.trim());

            window.location.href = "dashboard.html";
        }
    });
}

// ==============================
// AUTH LOGIC
// ==============================

// Unified login check: check session first, fallback to localStorage
const isLoggedIn =
    sessionStorage.getItem("loggedIn") === "true" ||
    localStorage.getItem("loggedIn") === "true";

// Show/hide protected links and logout
document.querySelectorAll(".protected").forEach(link => {
    if (!isLoggedIn) {
        link.style.display = "none";
    }
});

const logoutBtn = document.getElementById("logoutBtn") || document.querySelector(".logout");
if (logoutBtn) {
    if (isLoggedIn) {
        logoutBtn.style.display = "inline-block";
    } else {
        logoutBtn.style.display = "none";
    }

    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("userEmail");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userEmail");

        window.location.href = "login.html";
    });
}

// Protect pages: redirect if not logged in
document.addEventListener("DOMContentLoaded", () => {
    if (document.body.classList.contains("protected-page") && !isLoggedIn) {
        window.location.href = "login.html";
    }
});

// Handle all protected links (Dashboard, Chatbot button, etc.)
document.querySelectorAll(".protected").forEach(link => {
    link.addEventListener("click", function(event) {
        const isLoggedInNow =
            sessionStorage.getItem("loggedIn") === "true" ||
            localStorage.getItem("loggedIn") === "true";

        if (!isLoggedInNow) {
            event.preventDefault();
            window.location.href = "login.html";
        }
    });
});
