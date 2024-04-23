import React ,{ useState , useEffect } from 'react';
import './Employeedetailsdashboard.css';
import { useLocation , useNavigate, Routes, Route,Link } from 'react-router-dom';
import Admin from '../Admin/Admin';
import InterviewResponse from '../interviewResponse/interviewResponse';
import NewEmployeeDetails from'../NewEmployeeDetails/newEmployeeDetails';
import InterviewApprovedStatus from '../interviewApprovedStatus/interviewApprovedStatus';
import InterviewingStatus from '../interviewingStatus/interviewingStatus';
import InterviewHoldStatus from '../interviewHoldStatus/interviewHoldStatus';
import { FaUserCircle } from "react-icons/fa";
import ReInterviewSchedule from '../reInterviewSchedule/reInterviewSchedule';
import RegisterForm from '../Form/RegisterForm';
import SendEmail from '../Sendemail/mail';
const Employeedetailsdashboardmanager = () => {
  const [error, setError] = useState("");
  const location = useLocation();
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
        <div className='user-icon'>
        <FaUserCircle /> 
        <li>USER: {userEmail}</li>
        </div>
        <div className='user-details'>
        <div className='admin'>
        <li><Link to="/employeedetailsdashboard_manager/sendEmail">New_Employee_Send_Email</Link></li>
        </div>     
        <div className='admin'>
        <li><Link to="/employeedetailsdashboard_manager/employeeRegister">New_Employee_Registeration</Link></li>
        </div>                 
        <div className='admin'>
        <li><Link to="/employeedetailsdashboard_manager/admin">Employee details</Link></li>
        </div> 
        <div className='newEmployeedetails'>
        <li><Link to="/employeedetailsdashboard_manager/interviewingstatus">Interviewing</Link></li>
        </div>
        <div className='newEmployeedetails'>
        <li><Link to="/employeedetailsdashboard_manager/interviewapprovedstatus">Screaning Response</Link></li>
        </div>
        <div className='newEmployeedetails'>
        <li><Link to="/employeedetailsdashboard_manager/interviewHoldstatus">Select From Interview</Link></li>
        </div>
        <div className='interviewresponse'>
       <li><Link to="/employeedetailsdashboard_manager/interviewresponse">Interview Response</Link></li>
       </div>
        <div className='newEmployeedetails'>
        <li><Link to="/employeedetailsdashboard_manager/newEmployeedetails">New Employee details</Link></li>
        </div>
        <div className='newEmployeedetails'>
        <li><Link to="/employeedetailsdashboard_manager/reinterviewAndnonSelected">Re_interview_Schedule</Link></li>
        </div>
        <div className='empbtn'> 
         <button onClick={handleLogout} style={{backgroundColor:'white', width:'100px'}}>Logout</button>
        </div>
        </div>  
      </ul> 
      </div>
      <div className="content">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path = "/employeeRegister" element = {<RegisterForm/>}/>
            <Route path ="/sendEmail" element = {<SendEmail/>}/>
            <Route path="/interviewresponse" element={<InterviewResponse />} />         
            <Route path= "/newEmployeedetails" element={<NewEmployeeDetails/>} />
            <Route path = "/interviewapprovedstatus" element = {<InterviewApprovedStatus/>}></Route>
            <Route path = "/interviewHoldstatus" element = {<InterviewHoldStatus/>}></Route>
            <Route path = "/interviewingstatus" element = {<InterviewingStatus/>}></Route>
            <Route path = "/reinterviewAndnonSelected" element = {<ReInterviewSchedule/>}></Route>
          </Routes>
        </div>
    </div> 
        
  );
};

export default  Employeedetailsdashboardmanager;
