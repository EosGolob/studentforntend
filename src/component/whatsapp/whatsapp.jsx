import React, { useState } from 'react';
import axios from 'axios';
import './whatsapp.css';
import { TfiEmail } from "react-icons/tfi";
const SendMessageForm = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    const response = await axios.post('/send-message', { message });
    if (response.data.status === 'success') {
      setMessage('');
      setStatus('Message sent successfully!');
    } else {
      setStatus('Error sending message');
    }
  };

  return (
    <div className='whatsappclass'>
      <form onSubmit={sendMessage}>
        <div  className='whatsappinp'>
        <TfiEmail />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        </div>
        <br/>
        <div className='whatsappsubmitbtn'>
        <button type="submit">Send</button>
        </div>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SendMessageForm;