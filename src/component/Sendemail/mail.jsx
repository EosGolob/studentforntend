import React, { useState } from 'react';
import axios from 'axios';
import './mail.css';
import { TfiEmail } from "react-icons/tfi";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const sendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/sendemail', {
                email: email,
                subject: subject,
                text: message
            });
            toast.success('Email sent successfully',{
             position: "top-right",
             autoClose: 3000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
            });
            setStatus(response.data);
            // clearFields();
        } catch (error) {
            toast.error('Error sending email',{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,  
            });
            setStatus('Error sending email');
            console.error('Error sending email:', error);
        }
    };
    // const clearFields = () => {
    //     setEmail('');
    //     setSubject('');
    //     setMessage('');
    // };

    return (

        <div className="email-form-container">
            <ToastContainer/>
            <form onSubmit={sendEmail} className="email-form">
                <h2 className="form-heading">Send Email</h2>
                {/* <label htmlFor="recipient" className="form-label">To</label> */}
                <div className='email-icon'>
                    <TfiEmail />
                    <input type="email" id="recipient" value={email} onChange={e => setEmail(e.target.value)} required className="form-input" />
                </div>
                <div className="form-button">
                    <button type="submit">SUBMIT</button>
                </div>
                <div className="form-status">{status}</div>
            </form>
        </div>
    );
};

export default EmailForm;
