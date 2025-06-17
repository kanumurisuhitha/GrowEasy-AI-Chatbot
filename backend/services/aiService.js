const axios = require('axios');

const getAIResponse = async (chatHistory, industryProfile) => {
  const prompt = [
    {
      role: 'system',
      content: `You are an AI assistant for the ${industryProfile.industry} industry. Ask the following qualifying questions to gather info: ${industryProfile.qualifyingQuestions.join(
        ' '
      )}. Respond like a human WhatsApp assistant.`
    },
    ...chatHistory
  ];

  const response = await axios.post(
    process.env.OPENROUTER_API_URL + '/chat/completions',
    {
      model: 'openai/gpt-3.5-turbo',
      messages: prompt
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = { getAIResponse };
