import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../Login/Login';
import './Admin.css';


// const isAdmin = true;

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    }
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/submissions/${id}/updateStatus`, { status: newStatus });
      console.log('Submission status updated:', response.data);
      // Update submissions state to reflect the changes
      const updatedSubmissions = submissions.map(submission => {
        if (submission._id === id) {
          return { ...submission, status: newStatus };
        }
        return submission;
      });
      setSubmissions(updatedSubmissions);
      setFilteredSubmissions(updatedSubmissions);
    } catch (error) {
      console.error('Error updating submission status:', error);
    }
  };
  // const handleLogin = (email) => {
  //   console.log(`Logged in with email: ${email}`);
  //   // You can implement additional logic here after the user logs in
  // };
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilterSubmit = () => {
    const filteredData = submissions.filter(submission => {
      return (
        submission.interviewDate.includes(filterValue) || // Filter by interview date
        submission.email.includes(filterValue) // Filter by email ID
      );
    });
    setFilteredSubmissions(filteredData);
  };
  // console.log('response ',submissions)
  return (
    <div className="admin-panel-container" >
      {/* <Login onLogin={handleLogin} isAdmin={isAdmin} /> */}
      <h2>Filter Data </h2>
      <div>
        <input
          type="text"
          value={filterValue}
          onChange={handleFilterChange}
          placeholder="Enter interview date or email ID"
        />
        <button onClick={handleFilterSubmit}>Filter</button>
      </div>
      <table  id="submissionTable" >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Interview Date</th>
            <th>Job Profile</th>
            <th>Qualification</th>
            <th>Phone No</th>
            <th>Status</th>
            <th>permanentAddress</th>
            <th>currentAddress</th>
            <th>adharNo</th>
            <th>panNo</th>
            <th>gender</th>
            <th>previousEmployee</th>
            <th>dob</th>
            <th>Marital Status</th>
            <th>refferral</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission.firstName}</td>
              <td>{submission.middleName}</td>
              <td>{submission.lastName}</td>
              <td>{submission.email}</td>
              <td>{submission.interviewDate}</td>
              <td>{submission.jobProfile}</td>
              <td>{submission.qualification}</td>
              <td>{submission.phoneNo}</td>
              <td>{submission.permanentAddress}</td>
              <td>{submission.currentAddress}</td>
              <td>{submission.adharNo}</td>
              <td>{submission.panNo}</td>
              <td>{submission.gender}</td>
              <td>{submission.previousEmployee}</td>
              <td>{submission.dob}</td>
              <td>{submission.maritalStatus}</td>
              <td>{submission.refferral}</td>
              <td>
                <button onClick={() => handleUpdateStatus(submission._id, 'approved')}>Approve</button>
                <button onClick={() => handleUpdateStatus(submission._id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
