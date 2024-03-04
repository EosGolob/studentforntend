import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes ,RouterProvider, createBrowserRouter ,createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import RegisterForm from './component/Form/RegisterForm';
import Admin from './component/Admin/Admin';
import Login from './component/Login/Login';
import AdminRegistrationForm from './component/Form/AdminRegisterForm';
import MailSender from './component/Sendemail/mail';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='registerForm' element={<RegisterForm/>} />
      <Route path='admin' element={<Admin/>} />
      <Route path='login' element={<Login/>} />
      <Route path='adminlogin' element={<AdminRegistrationForm/>}/>
      <Route path='email' element={<MailSender/>} />
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router}/>
  </React.StrictMode>
);

reportWebVitals();
