import './App.css';
import Login from './component/Login/Login';
import Employeedetailsdashboard from './component/EmployeeDetailsdashboard/Employeedetailsdashboard';
import Employeedetailsdashboardmanager from'./component/EmployeeDetailsdashboard/Employeedetailsdashboardmanager'
import AdminRegisterForm  from "./component/Form/AdminRegisterForm";
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
  <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path ='/employeedetailsdashboard_hr/*' element={<Employeedetailsdashboard/>}/>
      <Route path ='/employeedetailsdashboard_manager/*' element={<Employeedetailsdashboardmanager/>}/>
      <Route path='/adminregister' element={<AdminRegisterForm/>}/>
    </Routes>
    </div>
  );
}
export default App;
