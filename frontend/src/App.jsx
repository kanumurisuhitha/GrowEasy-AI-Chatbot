import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import LeadForm from './components/LeadForm';
import './App.css';

function App() {
  const [leadInfo, setLeadInfo] = useState(null);

  return (
    <div className="app">
      {leadInfo ? (
        <ChatWindow leadInfo={leadInfo} />
      ) : (
        <LeadForm onSubmit={setLeadInfo} />
      )}
    </div>
  );
}

export default App;
