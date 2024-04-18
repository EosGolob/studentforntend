import React ,{ useState , useEffect } from 'react';
import './Employeedetailsdashboard.css';
import { useLocation , useNavigate, Routes, Route,Link } from 'react-router-dom';
import Email from '../Sendemail/mail';
import Admin from '../Admin/Admin';
import InterviewResponse from '../interviewResponse/interviewResponse';
import RegisterForm from '../Form/RegisterForm';
import NewEmployee from '../newEmployee/NewEmployee';
import NewEmployeeDetails from'../NewEmployeeDetails/newEmployeeDetails';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReInterviewSchedule from '../reInterviewSchedule/reInterviewSchedule';

const Employeedetailsdashboard = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  // const email = location.state ? location.state.email:'';
  
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
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
        <div className='user-icon'>
        <i><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></i>
        <li>USER: {userEmail}</li>
        </div>
              
        <div className='registerForm'>
        {/* <GiArchiveRegister className='archiveIcon'/> */}
        <li><Link to="/employeedetailsdashboard_hr/registerForm">Employee Register</Link></li>
        </div>
        <div className='email'>
        {/* <MdOutlineMailOutline /> */}
        <li><Link to="/employeedetailsdashboard_hr/email"> Send Email </Link></li>
        </div>
        <div className='admin'>
        <li><Link to="/employeedetailsdashboard_hr/admin">Employee details</Link></li>
        </div>
       <div className='interviewresponse'>
       <li><Link to="/employeedetailsdashboard_hr/interviewresponse">Interview Response</Link></li>
       </div>
        <div className='newEmployee'>
        <li><Link to="/employeedetailsdashboard_hr/newEmployee">New Employee</Link></li>
        </div>
        <div className='newEmployeedetails'>
        <li><Link to="/employeedetailsdashboard_hr/newEmployeedetails">New Employee details</Link></li>
        </div>
        <div className='newEmployeedetails'>
        <li><Link to="/employeedetailsdashboard_hr/reinterviewSchedule">Re Interviews Schedule</Link></li>
        </div>
        </ul> 
        <div className='empbtn'> 
        <button onClick={handleLogout} style={{backgroundColor:'white', width:'100px'}}>Logout</button>
        </div>
        
     
      </div>
      <div className="content">
          <Routes>
            <Route path="/email" element={<Email />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/interviewresponse" element={<InterviewResponse />} />
            <Route path ="/registerForm" element={<RegisterForm/>}/>
            <Route path= "/newEmployee" element={<NewEmployee/>} />
            <Route path= "/newEmployeedetails" element={<NewEmployeeDetails/>} />
            <Route path="/reinterviewSchedule" element={<ReInterviewSchedule />} />
          </Routes>
        </div>
    </div> 
        
  );
};

export default Employeedetailsdashboard;
