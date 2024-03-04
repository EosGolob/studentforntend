import React, { useState } from 'react';
import axios from 'axios';
import './mail.css';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const sendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/sendemail',{
                email: email,
                subject: subject,
                text: message
            });
            setStatus(response.data);
        } catch (error) {
            setStatus('Error sending email');
            console.error('Error sending email:', error);
        }
    };

    return (
        
        <div className="email-form-container">
        <form onSubmit={sendEmail} className="email-form">
            <h2 className="form-heading">Send Email</h2>
            <label htmlFor="recipient" className="form-label">To:</label>
            <input type="email" id="recipient" value={email} onChange={e => setEmail(e.target.value)} required className="form-input" />
            <button type="submit" className="form-button">Send Email</button>
            <div className="form-status">{status}</div>
        </form>
    </div>
    );
};

export default EmailForm;
