import React from 'react';
import './MessageBubble.css'; // Optional for custom styles

const MessageBubble = ({ text, sender }) => {
  const isUser = sender === 'user';

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
      <p>{text}</p>
    </div>
  );
};

export default MessageBubble;
