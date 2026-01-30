// js/chatbot.js

// 1. Logic for API calling (The part that shifts to Node.js/React later)
const ChatService = {
    async sendMessageToAI(userMessage) {
    // For the Prototype: Simulating an API call to OpenAI
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerMsg = userMessage.toLowerCase();

            // 1. Greetings
            if (["hello", "hi", "hey"].includes(lowerMsg)) {
                resolve("Hello! 👋 How can I help you today?");
            }
            // 2. Admission keyword
            else if (lowerMsg.includes("admission")) {
                resolve("The PUGC admissions for Spring 2026 are currently open. You can apply through the university portal.");
            }
            // 3. Event keyword
            else if (lowerMsg.includes("event")) {
                resolve("The next campus event is the 'Sport Festival 2026' scheduled for February.");
            }
            // 4. Generic fallback
            else {
                resolve("I understand you're asking about '" + userMessage + "'. As an AI, I am processing your request based on PUGC data...");
            }
        }, 1000);
    });
    }

};

// 2. UI Handling Logic
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');

    if (!sendBtn) return;

    sendBtn.addEventListener('click', async () => {
        const text = input.value.trim();
        if (!text) return;

        // Add User Message
        appendMessage('user', text);
        input.value = '';

        // Add Loading State
        appendMessage('bot', 'AI is thinking...', 'loading-text');

        // Get AI Response
        const response = await ChatService.sendMessageToAI(text);
        
        // Remove loading and add real response
        document.querySelector('.loading-text')?.remove();
        appendMessage('bot', response);
    });

    // Listen for Enter key press
     input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {  // Check if Enter is pressed
        e.preventDefault();   // Prevent newline in input
        sendBtn.click();      // Trigger the Send button click
    }
   });


    function appendMessage(sender, text, className = '') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender} ${className}`;
        msgDiv.innerText = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});