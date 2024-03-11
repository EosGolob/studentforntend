import './App.css';
import Login from './component/Login/Login';
import Employeedetailsdashboard from './component/EmployeeDetailsdashboard/Employeedetailsdashboard';
import AdminRegisterForm  from "./component/Form/AdminRegisterForm";
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
  <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path ='/employeedetailsdashboard/*' element={<Employeedetailsdashboard/>}/>
      <Route path='/adminregister' element={<AdminRegisterForm/>}/>
    </Routes>
    </div>
  );
}
export default App;
