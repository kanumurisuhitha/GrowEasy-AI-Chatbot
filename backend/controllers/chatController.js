// backend/controllers/chatController.js
const { getAIResponse } = require('C:/Users/suhit/groweasy-ai-chatbot/backend/services/aiService');
const { classifyLead } = require('../utils/classifyLead');
const businessProfile = require('../config/businessProfile');

let chatHistory = [];

const handleMessage = async (req, res) => {
  const { message, leadInfo } = req.body;
  const industryKey = leadInfo.industry || 'real-estate';
  const profile = businessProfile.industries[industryKey];

  if (!profile) {
    return res.status(400).json({ error: 'Unsupported industry' });
  }

  chatHistory.push({ role: 'user', content: message });

  const aiReply = await getAIResponse(chatHistory, businessProfile.industries[industryKey]);


  chatHistory.push({ role: 'assistant', content: aiReply });

  const classification = classifyLead(chatHistory, profile); // Pass profile here too

  res.json({
    reply: aiReply,
    classification,
    metadata: classification.metadata,
    chatHistory
  });
};

module.exports = { handleMessage };
