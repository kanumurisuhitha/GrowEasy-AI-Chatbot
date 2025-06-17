import React, { useState } from 'react';
import './LeadForm.css';

function LeadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
  name: '',
  phone: '',
  source: '',
  message: '',
  industry: '' // ✅ Add this
});


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
  <input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
  <input placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
  
  <select onChange={(e) => setFormData({ ...formData, industry: e.target.value })}>
  <option value="">Select Industry</option>
  <option value="real-estate">Real Estate</option>
  <option value="automobile">Automobile</option>
  <option value="education">Education</option>
</select>

  
  <textarea placeholder="Initial Message" onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
  <button type="submit">Start Chat</button>
</form>

  );
}

export default LeadForm;
