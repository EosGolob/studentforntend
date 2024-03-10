import React ,{ useState , useEffect } from 'react';
import './Employeedetailsdashboard.css';
import { useLocation , useNavigate, Routes, Route,Link } from 'react-router-dom';
import Email from '../Sendemail/mail';
import Admin from '../Admin/Admin';
import InterviewResponse from '../interviewResponse/interviewResponse';
import WhatsApp from '../whatsapp/whatsapp';
import RegisterForm from '../Form/RegisterForm';
const Employeedetailsdashboard = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  // const email = location.state ? location.state.email:'';
  const userEmail = localStorage.getItem('userEmail');
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

// this code is for if user logout the contain won't show after once logout
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/');
    }else{
      setEmail(userEmail);
    }
  }, []);

  
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    // Redirect to login page
    navigate('/')
  };
  return (
    <div className="dashboard-container">
    <div className="side-dashboard">
      <ul className='EmpDetails'>
        <li>USER: {userEmail}</li>
        <li><Link to="/employeedetailsdashboard/registerForm">Employee Register</Link></li>
        <li><Link to="/employeedetailsdashboard/email"> Send Email </Link></li>
        <li><Link to="/employeedetailsdashboard/admin">Employee details</Link></li>
        <li><Link to="/employeedetailsdashboard/interviewresponse">Interview Response</Link></li>
        <li><Link to="/employeedetailsdashboard/whatsapp">Contact</Link></li>
        <button onClick={handleLogout}>Logout</button>
      </ul> 
      </div>
      <div className="content">
          <Routes>
            <Route path="/email" element={<Email />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/interviewresponse" element={<InterviewResponse />} />
            <Route path ="/registerForm" element={<RegisterForm/>}/>
            <Route path="/whatsapp" element={<WhatsApp />} />
          </Routes>
        </div>
    </div> 
        
  );
};

export default Employeedetailsdashboard;
