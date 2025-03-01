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
            socket.emit('ai-response', { text: response });``
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
        // Create a structured prompt for better accuracy
        const prompt = `Question: ${text}\nAnswer: Let me provide a clear and accurate response:\n`;

        const response = await hf.textGeneration({
            model: "google/flan-t5-base",
            inputs: prompt,
            parameters: {
                max_length: 100,
                temperature: 0.3,
                top_p: 0.95,
                top_k: 40,
                repetition_penalty: 1.2,
                do_sample: true,
                num_return_sequences: 1
            }
        });

        if (!response || !response.generated_text) {
            throw new Error('No response from model');
        }

        // Enhanced response cleaning
        let cleanedResponse = response.generated_text
            .trim()
            .replace(/^[\s"]+|[\s"]+$/g, '')
            .replace(/Question:|Answer:|Let me provide.*response:/gi, '')
            .trim();

        return cleanedResponse || "I apologize, but I couldn't generate a proper response.";
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return "I apologize, but I'm having trouble processing your request. Please try again.";
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));