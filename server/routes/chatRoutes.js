const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const { v4: uuidv4 } = require('uuid');

// Save a chat message
router.post('/message', async (req, res) => {
  try {
    const { sessionId, sender, text, userId, attachments = [] } = req.body;
    
    // Generate a session ID if not provided
    const chatSessionId = sessionId || uuidv4();
    
    const message = new ChatMessage({
      sessionId: chatSessionId,
      sender,
      text,
      user: userId || null,
      attachments
    });
    
    await message.save();
    
    res.status(201).json({
      message,
      sessionId: chatSessionId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat history for a session
router.get('/history/:sessionId', async (req, res) => {
  try {
    const messages = await ChatMessage.find({ 
      sessionId: req.params.sessionId 
    }).sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// AI chat endpoint
router.post('/ai-chat', async (req, res) => {
  try {
    const { messages, sessionId } = req.body;

    // Here you would normally call your AI service
    // For this example, we'll simulate a response
    const botResponse = {
      role: "assistant",
      content: "Thank you for contacting MACHA Services! How can I help you today? I can assist with booking services, providing information, or connecting you with a human agent."
    };

    // Save the response to the database
    if (sessionId) {
      await ChatMessage.create({
        sessionId,
        sender: 'agent',
        text: botResponse.content,
        read: false
      });
    }

    res.json({ response: botResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
