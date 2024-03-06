import React ,{ useState } from 'react';
import './Employeedetailsdashboard.css';
import { useLocation , useNavigate } from 'react-router-dom';
const SideDashboard = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  const email = location.state.email; 
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
    <div className="side-dashboard">
      <ul className='EmpDetails'>
        <li>USER:{email}</li>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="/email">Send email new Employee</a></li>
        <li><a href="/admin">Employee details</a></li>
        <li><a href="/interviewresponse">Interview Response </a></li>
        <li><a href="#">Contact</a></li>
        <button onClick={handleLogout}>Logout</button>
      </ul>     
    </div>

  
    </>
  );
};

export default SideDashboard;
