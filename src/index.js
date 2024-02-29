import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './component/Home/Home';
import RegisterForm from './component/Form/RegisterForm';
import Admin from './component/Admin/Admin';
import Login from './component/Login/Login';
 
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element: <Home/>
      },
      {
        path:"registerForm",
        element:<RegisterForm/>
      },
      {
        path:"admin",
        element:<Admin/>

      },
      {
        path:"login",
        element:<Login/>
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={ router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
