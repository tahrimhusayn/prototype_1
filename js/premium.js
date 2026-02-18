// Grab elements
const checkboxes = document.querySelectorAll('.feature-checkbox');
const confirmBtn = document.getElementById('confirm-subscription');

confirmBtn.addEventListener('click', () => {
    let purchasedFeatures = [];

    checkboxes.forEach(cb => {
        if(cb.checked) {
            purchasedFeatures.push(cb.value.trim()); // <-- store exact feature name
        }
    });

    if(purchasedFeatures.length === 0) {
        alert('Please select at least one feature to subscribe!');
        return;
    }

    // Save purchased features in localStorage
    localStorage.setItem('purchasedFeatures', JSON.stringify(purchasedFeatures));

    // Redirect to checkout page
    window.location.href = 'checkout.html';
});
