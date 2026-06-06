# 🤖 PUGC SmartBot

## 📌 Project Overview

**PUGC SmartBot** is an **AI-powered academic virtual assistant** built for students, staff, and visitors of **Punjab University Gujranwala Campus (PUGC)**. It provides instant answers to queries about courses, admissions, events, and facilities — with a premium subscription model for advanced features.

This prototype is a **front-end only web application** built with pure HTML, CSS, and JavaScript — featuring a public-facing landing site, role-based dashboards (Student & Admin), an AI chatbot interface, and a flexible premium subscription system.

---

## 🚀 Features

### 🌐 Public Landing Pages
- **Home Page** — Hero section with a "Start Chatting Now" CTA, app introduction
- **About Page** — Overview of PUGC SmartBot's purpose and capabilities
- **Contact Page** — Google Maps embed + message form for support queries

---

### 🔐 Authentication System
- **Sign In** — Email & password login with "Remember Me" and Forgot Password link
- **Sign Up** — Full registration form with name, email, and password confirmation
- **Forgot Password** — Email-based password reset flow
- Role-based redirect: Students → Student Dashboard, Admin → Admin Dashboard

---

### 🎓 Student Dashboard
- Welcome banner with feature highlights (Unlimited AI Chats, 24/7 Availability, Security)
- Quick actions: **Open Chatbot** and **Subscribe Now**
- Clean sidebar navigation: Home, Student Dashboard, Premium, Chatbot

---

### 💬 Chatbot Interface
- Conversational UI with message input and send button
- Quick-access tabs: **FAQ 🔒**, **Events**, **History 🔒**, **Feedback 🔒**
- Lock icons indicate premium-only features for non-subscribed users
- Accepts questions about courses, admissions, events, and general guidance

---

### 👑 Premium Subscription
- **Feature Selection Page** — 4 selectable premium add-ons:
  - ❓ FAQ Auto Suggestions — $5
  - 🕐 Chat History — $3
  - 📅 Event Reminders — $4
  - ⭐ Feedback & Ratings — $2
- **Checkout Page** — Full Name, Email, Payment Method (DebitCard / Easypaisa / JazzCash), dynamic total, and Confirm Payment button

---

### 🛠️ Admin Dashboard
- **Overview** — Stats cards: Total Users, Feedback Count, Subscriptions
- **Manage FAQs** — Add/update chatbot FAQ entries
- **Manage Events** — Add exam dates and announcements
- **User Feedback** — View chatbot ratings and user feedback
- Sidebar navigation: Overview, Users, Subscriptions, FAQs, Events, Feedback

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Google Maps Embed API (Contact Page)
- localStorage (Client-side data persistence)

---

## 📸 Screenshots

All UI screenshots are available in the `/Screenshots` folder of this repository.

| Page | Description |
|------|-------------|
| Home | Public landing page with hero CTA |
| About | PUGC SmartBot introduction |
| Contact | Map + contact form |
| Sign In | Login page |
| Sign Up | Registration page |
| Forgot Password | Password reset page |
| Student Dashboard | Main student portal |
| Chatbot | AI chat interface |
| Premium Features | Feature selection page |
| Checkout | Payment & subscription confirmation |
| Admin Dashboard | Admin control panel |

---

## 🔮 Future Improvements

- Real AI model integration (NLP / LLM backend)
- Node.js / Express backend for server-side logic
- Firebase Authentication with verified email support
- Firestore database for FAQs, events, and user data
- Stripe / JazzCash payment gateway integration
- Push notifications for Event Reminders
- Mobile-responsive / PWA version
- Analytics dashboard for admin insights
