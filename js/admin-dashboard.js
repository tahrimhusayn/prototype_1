// ================= ADMIN AUTH FIX =================
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = "login.html"; // Redirect non-admins
}

// ================= SIDEBAR NAV =================
document.querySelectorAll('.sidebar-menu a[data-section]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

        link.classList.add('active');
        document.getElementById(link.dataset.section).classList.add('active');
    });
});

// ================= ADMIN ACTIONS BUTTONS =================
document.querySelectorAll('.action-card button').forEach(btn => {
    btn.addEventListener('click', e => {
        const sectionId = e.target.closest('.action-card').dataset.action;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));

        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`.sidebar-menu a[data-section="${sectionId}"]`).classList.add('active');
    });
});

// ================= DATA =================
const users = JSON.parse(localStorage.getItem('users') || '[]');
const feedback = JSON.parse(localStorage.getItem('feedback') || '[]');
const faqs = JSON.parse(localStorage.getItem('adminFAQs') || '[]');
const events = JSON.parse(localStorage.getItem('adminEvents') || '[]');

// ================= OVERVIEW =================
document.getElementById('statUsers').innerText = users.length;
document.getElementById('statFeedback').innerText = feedback.length;
document.getElementById('statSubs').innerText =
    users.filter(u => u.features && u.features.length).length;

// ================= USERS =================
const usersDiv = document.getElementById('users');
usersDiv.innerHTML = `<h2>Users</h2><div class="admin-list"></div>`;

function renderUsers() {
    const list = usersDiv.querySelector('.admin-list');
    list.innerHTML = '';

    users.forEach((u, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <strong>${u.name || 'User'}</strong><br>
            📧 ${u.email}<br>
            💳 Features: ${u.features?.length ? u.features.join(', ') : 'None'}
            <i class="fas fa-trash delete-icon" title="Delete User"></i>
        `;

        card.querySelector('.delete-icon').addEventListener('click', () => {
            deleteUser(i);
        });

        list.appendChild(card);
    });
}

function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();
}

renderUsers();

// ================= SUBSCRIPTIONS =================
const subsDiv = document.getElementById('subscriptions');
subsDiv.innerHTML = `<h2>Subscriptions</h2><div class="admin-list"></div>`;

function renderSubscriptions() {
    const list = subsDiv.querySelector('.admin-list');
    list.innerHTML = '';

    users.forEach((u, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            ${u.email} — ${u.features?.length ? u.features.join(', ') : 'No Subscription'}
            <i class="fas fa-trash delete-icon" title="Remove Subscription"></i>
        `;

        card.querySelector('.delete-icon').addEventListener('click', () => {
            removeSubscription(i);
        });

        list.appendChild(card);
    });
}

function removeSubscription(index) {
    users[index].features = [];
    localStorage.setItem('users', JSON.stringify(users));
    renderSubscriptions();
}

renderSubscriptions();

// ================= FAQ =================
const faqDiv = document.getElementById('faqs');
faqDiv.innerHTML = `
<h2>FAQs</h2>
<div class="admin-form">
    <input id="faqQ" placeholder="Question">
    <input id="faqA" placeholder="Answer">
    <button onclick="addFAQ()">Add</button>
</div>
<div class="admin-list"></div>
`;

function renderFAQs() {
    const list = faqDiv.querySelector('.admin-list');
    list.innerHTML = '';
    faqs.forEach((f, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <strong>${f.q}</strong><br>${f.a}
            <i class="fas fa-trash delete-icon" title="Delete FAQ"></i>
        `;

        // Delete event
        card.querySelector('.delete-icon').addEventListener('click', () => {
            deleteFAQ(i);
        });

        list.appendChild(card);
    });
}

renderFAQs();

function addFAQ() {
    faqs.push({ q: faqQ.value, a: faqA.value });
    localStorage.setItem('adminFAQs', JSON.stringify(faqs));
    faqQ.value = '';
    faqA.value = '';
    renderFAQs();
}

function deleteFAQ(i) {
    faqs.splice(i, 1);
    localStorage.setItem('adminFAQs', JSON.stringify(faqs));
    renderFAQs();
}

// ================= EVENTS =================
const eventDiv = document.getElementById('events');
eventDiv.innerHTML = `
<h2>Events</h2>
<div class="admin-form">
    <input id="eventTitle" placeholder="Event Title">
    <input id="eventDate" type="date">
    <button onclick="addEvent()">Add</button>
</div>
<div class="admin-list"></div>
`;

function renderEvents() {
    const list = eventDiv.querySelector('.admin-list');
    list.innerHTML = '';
    events.forEach((e, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            ${e.date} — ${e.title}
            <i class="fas fa-trash delete-icon" title="Delete Event"></i>
        `;

        // Delete event
        card.querySelector('.delete-icon').addEventListener('click', () => {
            deleteEvent(i);
        });

        list.appendChild(card);
    });
}

renderEvents();

function addEvent() {
    events.push({ title: eventTitle.value, date: eventDate.value });
    localStorage.setItem('adminEvents', JSON.stringify(events));
    eventTitle.value = '';
    eventDate.value = '';
    renderEvents();
}

function deleteEvent(i) {
    events.splice(i, 1);
    localStorage.setItem('adminEvents', JSON.stringify(events));
    renderEvents();
}

// ================= FEEDBACK =================
const feedDiv = document.getElementById('feedback');
feedDiv.innerHTML = `<h2>Feedback</h2><div class="admin-list"></div>`;
feedback.forEach(f => {
    feedDiv.querySelector('.admin-list').innerHTML += `
    <div class="card">
        ⭐ ${f.rating}/5<br>
        ${f.message}<br>
        <small>${f.userEmail}</small>
    </div>`;
});
