// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const startBtn = document.getElementById('start-record');
    const stopBtn = document.getElementById('stop-record');
    const statusDiv = document.getElementById('status');
    const chatMessages = document.getElementById('chat-messages');
    
    let recognition;
    let speechSynthesis = window.speechSynthesis;
    
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      statusDiv.textContent = 'Speech recognition not supported in this browser';
      startBtn.disabled = true;
      return;
    }
    
    // Initialize speech recognition
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    // Start recording
    startBtn.addEventListener('click', () => {
      recognition.start();
      statusDiv.textContent = 'Listening...';
      startBtn.disabled = true;
      stopBtn.disabled = false;
    });
    
    // Stop recording
    stopBtn.addEventListener('click', () => {
      recognition.stop();
      statusDiv.textContent = 'Processing...';
      stopBtn.disabled = true;
    });
    
    // Handle speech recognition results
    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      addMessage('user', speechText);
      
      // Send speech data to server
      socket.emit('speech-data', { text: speechText });
    };
    
    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      statusDiv.textContent = `Error: ${event.error}`;
      resetButtons();
    };
    
    // When recognition ends
    recognition.onend = () => {
      resetButtons();
    };
    
    // Handle AI response from server
    socket.on('ai-response', (data) => {
      addMessage('bot', data.text);
      speakText(data.text);
      statusDiv.textContent = 'Ready';
    });
    
    // Speak the AI response
    function speakText(text) {
      if (speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
      }
    }
    
    // Add message to chat window
    function addMessage(sender, text) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${sender}-message`;
      messageDiv.textContent = text;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Reset recording buttons
    function resetButtons() {
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });