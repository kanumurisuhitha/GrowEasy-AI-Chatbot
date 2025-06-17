import React, { useState } from 'react';
import axios from '../api';
import './ChatWindow.css'; // You'll create this file for WhatsApp-like styles

function ChatWindow({ leadInfo }) {
 const industryGreeting = {
  'real-estate': "I'm your GrowEasy real estate assistant.",
  'automobile': "I'm your GrowEasy automobile assistant.",
  'education': "I'm your GrowEasy education assistant."
};

const [messages, setMessages] = useState([
  {
    role: 'system',
    text: `🤖: Hi ${leadInfo.name}! ${industryGreeting[leadInfo.industry] || "I'm your GrowEasy assistant."} ${'' || 'How can I help you today?'}`
  }
]);

  const [input, setInput] = useState('');
  const [classification, setClassification] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: `👤: ${input}` };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('/message', {
        message: input,
        leadInfo,
      });

      const aiMessage = { role: 'ai', text: `🤖: ${res.data.reply}` };
      setMessages((prev) => [...prev, aiMessage]);

      // Update classification only when it changes
      if (res.data.classification?.status && res.data.classification.status !== classification?.status) {
        setClassification(res.data.classification);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', text: '🤖: Sorry, something went wrong.' }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
  GrowEasy {leadInfo.industry === 'automobile'
    ? 'Auto Assistant'
    : leadInfo.industry === 'education'
    ? 'Education Assistant'
    : 'Realtor Assistant'}
</div>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>

      {classification && (
        <div className="classification-box">
          <h3>📊 Lead Classification</h3>
          <p><strong>Status:</strong> {classification.status}</p>
          {classification.metadata && Object.keys(classification.metadata).length > 0 && (
            <div>
              <h4>📍 Metadata:</h4>
              <ul>
                {Object.entries(classification.metadata).map(([key, value]) => (
                  <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
