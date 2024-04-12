import React from 'react';
import axios from 'axios';
function SendMessageButton() {
    const handleClick = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/send-message', {
            message: 'Hello, this is a test message.'
          });
          console.log('Message sent successfully');
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
  return (
    <button onClick={handleClick}>Send Message</button>
  );
}
export default SendMessageButton;
