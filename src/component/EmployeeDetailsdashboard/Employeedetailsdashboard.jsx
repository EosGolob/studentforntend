import React ,{ useState } from 'react';
import './Employeedetailsdashboard.css';
import EmailForm from '../Sendemail/mail';

const SideDashboard = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSendEmailClick = () => {
    setShowEmailForm(true);
  };
   // Function to handle successful login and set user email
   const handleLogin = (email) => {
    setUserEmail(email);
    // Additional login logic can be added here if needed
  };
  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here
    // For example: clear user session, redirect to login page, etc.
  };
  return (
    <>
    <div className="side-dashboard">
      <ul className='EmpDetails'>
        <li><a class="active" href="#home">Home</a></li>
        <li>User Email: {userEmail}</li>
        <li><a href="/email">Send email new Employee</a></li>
        <li><a href="/admin">Employee details</a></li>
        <li><a href="/interviewresponse">Interview Response </a></li>
        <li><a href="#">Contact</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>     
    </div>
    <div className="email-page">
    {showEmailForm && <EmailForm />}
    </div>
    </>
  );
};

export default SideDashboard;
