function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message) {
        appendMessage(message, 'user');
        userInput.value = '';

        // Simulate bot response (replace with actual API call)
        // setTimeout(() => {
        //     appendMessage("I'm just a demo bot. Replace this with Gemini API response!", 'bot');
        // }, 500);

        // Uncomment below to use Gemini API
        
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage(data.message, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}