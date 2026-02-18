// Back button to Premium page
document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'premium.html';
});

// Get form fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const featuresContainer = document.getElementById('selected-features');
const totalAmount = document.getElementById('total-amount');

// Load current user from localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {name: '', email: '', features: []};
nameInput.value = currentUser.name || '';
emailInput.value = currentUser.email || '';

// Load selected features from localStorage
let purchasedFeatures = JSON.parse(localStorage.getItem('purchasedFeatures')) || currentUser.features || [];

// Map of feature prices
const featurePrices = {
    "FAQ Auto Suggestions": 5,
    "Chat History": 3,
    "Event Reminders": 4,
    "Feedback & Ratings": 2
};

// Render features and total
function renderFeatures() {
    featuresContainer.innerHTML = '';
    let total = 0;

    purchasedFeatures.forEach(feature => {
        const price = featurePrices[feature] || 0;
        total += price;

        const div = document.createElement('div');
        div.className = 'feature-item';
        div.innerHTML = `
            <h4>${feature}</h4>
            <span>$${price}</span>
        `;
        featuresContainer.appendChild(div);
    });

    totalAmount.textContent = total;
}

renderFeatures();

// Confirm payment button
document.getElementById('confirm-payment').addEventListener('click', () => {
    if(purchasedFeatures.length === 0){
        alert('Please select at least one feature to proceed!');
        return;
    }

    // Save purchased features to currentUser
    currentUser.features = purchasedFeatures;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // ✅ Update the global users array
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.map(u => u.email === currentUser.email ? currentUser : u);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Subscription confirmed! Features unlocked.');
    window.location.href = 'chatbot.html';
});
