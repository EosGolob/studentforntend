import './App.css';
import SubmissionForm from './SubmissionForm';
import AdminPanel from './AdminPanel';
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <SubmissionForm/>
       <AdminPanel/>
      </header>
    </div>
  );
}

export default App;
