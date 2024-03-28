import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewEmployee.css';
import Pagination  from "react-js-pagination";
function NewEmployee() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [joiningDate, setJoiningDate] = useState('');
  const [trainingStartDate, setTrainingStartDate] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [updateStatus, setUpdateStatus] = useState(''); 
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);
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
    setUpdateStatus('');
  };

  const handlePageChange = (PageNumber) => {
    setPageNumber(PageNumber);
  };
  const indexOfLastSubmission = pageNumber * pageSize;
  const indexOfFirstSubmission = indexOfLastSubmission - pageSize;
  const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

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
      setUpdateStatus('Failed to update submission!');
    }
  };

  return (
    <>
      {/* <h1>Approved Submissions Employee</h1>
      <div className="table-and-form-container">
      <div className="table-container">
      <table className ="employees-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th> */}
            {/* <th>Update Status</th> */}
          {/* </tr>
        </thead>
        <tbody>
         
          {currentSubmissions.map(submission => (
            <tr key={submission._id} onClick={() => handleRowClick(submission)}>
              <td>{submission.firstName}</td>
              <td>{submission.lastName}</td>
              <td>{submission.email}</td> */}
              {/* <td>{selectedSubmission && selectedSubmission.email === submission.email ? updateStatus : ''}</td> */}
            {/* </tr>
          ))}
        </tbody>
      </table>
    </div>
      {selectedSubmission && (
        <div className='form-container'>
          <h2>Update Submission</h2>
          <label htmlFor="joiningDate">Joining Date:</label>
          <input type="date" id="joiningDate" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} required /><br />

          <label htmlFor="trainingStartDate">Training Start Date:</label>
          <input type="date" id="trainingStartDate" value={trainingStartDate} onChange={(e) => setTrainingStartDate(e.target.value)} required /><br />

          <label htmlFor="employeeCode">Employee Code:</label>
          <input type="text" id="employeeCode" value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} required /><br />

          <button onClick={handleSubmit}>Submit</button> */}
          {/* {updateStatus && <p>{updateStatus}</p>} */}
        {/* </div>
        )}
        </div>
        <div className="pagination-container">
          <Pagination
             activePage={pageNumber}
             itemsCountPerPage={pageSize}
             totalItemsCount={submissions.length}
             pageRangeDisplayed={5}
             onChange={handlePageChange}
          />
        </div> */}
         <>
      <h1>Approved Submissions Employee</h1>
      <div className="table-and-form-container">
        <div className="table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {currentSubmissions.map(submission => (
                <tr key={submission._id} onClick={() => handleRowClick(submission)}>
                  <td>{submission.firstName}</td>
                  <td>{submission.lastName}</td>
                  <td>{submission.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
        <div className="form-container">
        <div className="selected-submission-details">
          {selectedSubmission && (
            <>
              <h2>Selected Submission</h2>
              <p><strong>First Name:</strong> {selectedSubmission.firstName}</p> 
              <p><strong>Last Name:</strong> {selectedSubmission.lastName}</p>
              <p><strong>Email:</strong> {selectedSubmission.email}</p>
            </>
          )}
        </div>
          {selectedSubmission && (
            <>
              {/* <h2>Update Submission</h2> */}
              <label htmlFor="joiningDate">Joining Date:</label>
              <input type="date" id="joiningDate" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} required /><br />
              <label htmlFor="trainingStartDate">Training Start Date:</label>
              <input type="date" id="trainingStartDate" value={trainingStartDate} onChange={(e) => setTrainingStartDate(e.target.value)} required /><br />
              <label htmlFor="employeeCode">Employee Code:</label>
              <input type="text" id="employeeCode" value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} required /><br />
              <button onClick={handleSubmit}>Submit</button>
            </>
          )}
        </div>
      </div>
      <div className="pagination-container">
        <Pagination
          activePage={pageNumber}
          itemsCountPerPage={pageSize}
          totalItemsCount={submissions.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    </>
    </>
  );
}

export default NewEmployee;
