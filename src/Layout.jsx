import React from 'react'
import Header from './component/Header/Header'
import { Outlet } from 'react-router-dom'
import Login from './component/Login/Login'
import Employeedetailsdashboard from './component/EmployeeDetailsdashboard/Employeedetailsdashboard';
function Layout() {
  return (
    <>
    {/* <Login></Login> */}
    <Header></Header>
    <Outlet/>
   
    </>
  )
}

export default Layout