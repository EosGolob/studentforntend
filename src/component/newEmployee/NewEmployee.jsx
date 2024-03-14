import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewEmployee.css';
function NewEmployee() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [joiningDate, setJoiningDate] = useState('');
  const [trainingStartDate, setTrainingStartDate] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');

  console.log("submission value",submissions);
  const fetchApprovedSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employeedetails/approved');
      setSubmissions(response.data);
      
    } catch (error) {
      console.error('Error fetching approved submissions:', error);
    }
  };

  useEffect(() => {
    fetchApprovedSubmissions();
  }, []);

  const handleRowClick = (submission) => {
    setSelectedSubmission(submission);
    setJoiningDate('');
    setTrainingStartDate('');
    setEmployeeCode('');
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/employeedetails/${selectedSubmission.email}/updateStatus`, {
        status: 'approved',
        joiningDate,
        trainingStartDate,
        employeeCode
      });
      alert('Submission updated successfully!');
      fetchApprovedSubmissions(); // Refresh the list of approved submissions
    } catch (error) {
      console.error('Error updating submission:', error);
      alert('Failed to update submission!');
    }
  };

  return (
    <>
      <h1>Approved Submissions</h1>
      <table id="employees-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission._id} onClick={() => handleRowClick(submission)}>
              <td>{submission.firstName}</td>
              <td>{submission.lastName}</td>
              <td>{submission.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSubmission && (
        <div>
          <h2>Update Submission</h2>
          <label htmlFor="joiningDate">Joining Date:</label>
          <input type="date" id="joiningDate" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} required /><br />

          <label htmlFor="trainingStartDate">Training Start Date:</label>
          <input type="date" id="trainingStartDate" value={trainingStartDate} onChange={(e) => setTrainingStartDate(e.target.value)} required /><br />

          <label htmlFor="employeeCode">Employee Code:</label>
          <input type="text" id="employeeCode" value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} required /><br />

          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </>
  );
}

export default NewEmployee;
