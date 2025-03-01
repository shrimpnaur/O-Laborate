require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');
const { HfInference } = require('@huggingface/inference');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const hf = new HfInference('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');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('speech-data', async (data) => {
        try {
            const response = await processAIResponse(data.text);
            socket.emit('ai-response', { text: response });
        } catch (error) {
            console.error('Error processing speech:', error);
            socket.emit('error', { message: 'Failed to process speech' });
        }
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

async function processAIResponse(text) {
    try {
        const response = await hf.textGeneration({
            model: "gpt2",  // Using a more reliable model
            inputs: text,
            parameters: {
                max_length: 100,
                temperature: 0.7,
                top_p: 0.9,
                return_full_text: false
            }
        });

        if (!response || !response.generated_text) {
            throw new Error('No response from model');
        }

        return response.generated_text.trim();
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return "I apologize, but I'm having trouble processing your request right now.";
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));