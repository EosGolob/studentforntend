import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import './Login.css'
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill,RiEyeFill, RiEyeOffFill } from "react-icons/ri";

  const Login = ({ onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:5000/api/Adminlogin', { email, password });
      const {token} =response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email); // Set user email in localStorage
      navigate('/employeedetailsdashboard',{ state: { email } })
    } catch (error) {
      setError('Invalid email or password');
      console.error(error);
    }
  };

  return (
  <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="form-heading">Admin Login</h2> 
        {error && <p className="error-message">{error}</p>} 
        {/* <label htmlFor="email" className="form-label">Email:</label> */}
        {/* <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" /> */}
        {/* <label htmlFor="password" className="form-label">Password:</label> */}
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FaUserCircle /></span>
          </div>
          <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" />
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><RiLockPasswordFill /></span>
          </div>
          <input 
          type={showPassword ? "text" :"password"}
           id="password" placeholder="Enter your password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required className="form-control" />
        </div>
        <div className="show-passwordicon">
        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
          <label>Show  Password </label>      
        </div>
        <div className='admin-register'>
          <label><Link to="/adminregister">Sing up</Link></label>
          </div>
        {/* <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" /> */}
        <button type="submit"  style={{ backgroundColor: '#7546ba',}}className="form-button">Login</button>
      </form>
    </div>
);
};

export default Login;
