// import './App.css';
import Layout from './Layout';
import RegisterForm from './component/Form/RegisterForm';
import Admin from './component/Admin/Admin';
import Login from './component/Login/Login';
import AdminRegistrationForm from './component/Form/AdminRegisterForm';
import MailSender from './component/Sendemail/mail';
import Employeedetailsdashboard from './component/EmployeeDetailsdashboard/Employeedetailsdashboard';
import InterviewResponse from './component/interviewResponse/interviewResponse'
import Whatsapp from './component/whatsapp/whatsapp'
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
  <Routes>
      {/* <Route path='/' element={<Layout />}/> */}
      <Route path='/' element={<Login/>}/>
      <Route path='registerForm' element={<RegisterForm/>} />
      <Route path='admin' element={<Admin/>} />
      <Route path='layout' element={<Layout/>}/>
     // <Route path='login' element={<Login/>} /> 
      <Route path='adminlogin' element={<AdminRegistrationForm/>}/>
      <Route path='email' element={<MailSender/>} />
      <Route path ='employeedetailsdashboard' element={<Employeedetailsdashboard/>}/>
      <Route path='interviewresponse' element={<InterviewResponse/>}/>
      <Route path='whatsapp' element={<Whatsapp/>}/>
    </Routes>
    </div>
  );
}
export default App;
