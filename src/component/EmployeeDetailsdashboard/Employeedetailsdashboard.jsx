import React ,{ useState , useEffect } from 'react';
import './Employeedetailsdashboard.css';
import { useLocation , useNavigate,BrowserRouter as Routes, Route } from 'react-router-dom';

const Employeedetailsdashboard = () => {
// const SideDashboard = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  const email = location.state ? location.state.email:'';
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };
// this code is for if user logout the contain won't show after once logout
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/login');
    }
  }, []);

  return (
 
    <div className="side-dashboard">
      <ul className='EmpDetails'>
        <li>USER:{email}</li>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="/email">Send email new Employee</a></li>
        <li><a href="/admin">Employee details</a></li>
        <li><a href="/interviewresponse">Interview Response </a></li>
        <li><a href="/whatsapp">Contact</a></li>
        <button onClick={handleLogout}>Logout</button>
      </ul> 
    </div> 
  );
};

export default Employeedetailsdashboard;
