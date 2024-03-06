import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);


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
      const response = await axios.put(`http://localhost:5000/api/submissions/${id}/updateStatus`, { status: newStatus });
      console.log('Submission status updated:', response.data);
      // Update submissions state to reflect the changes
      const updatedSubmissions = submissions.map(submission => {
        if (submission._id === id) {
          return { ...submission, status: newStatus };
        }
        return submission;
      });
      setSubmissions(updatedSubmissions);
    } catch (error) {
      console.error('Error updating submission status:', error);
    }
  };
  const handleManagerResponse = async (id, response) => {
    try {
      // Update the submission with manager response in the database
      const updatedSubmission = await axios.put(`http://localhost:5000/api/submissions/${id}/managerResponse`, { response });
      console.log('Manager response saved:', updatedSubmission.data);
      // You can update the state or perform any other actions as needed
    } catch (error) {
      console.error('Error saving manager response:', error);
    }
  }
  
  return (
    <div className="admin-panel-container" >
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
            <th>permanentAddress</th>
            <th>currentAddress</th>
            <th>adharNo</th>
            <th>panNo</th>
            <th>gender</th>
            <th>previousEmployee</th>
            <th>dob</th>
            <th>Marital Status</th>
            <th>referral</th>
            <th>Manager Response</th>
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
              <td>{submission.referral}</td>
             
              <td>
                {/* <button onClick={() => handleUpdateStatus(submission._id, '')}>Select your response</button> */}
                <button onClick={() => handleUpdateStatus(submission._id, 'approved')}>Approve</button>
                <button onClick={() => handleUpdateStatus(submission._id, 'rejected')}>Reject</button>
                <button onClick={() => handleUpdateStatus(submission._id, 'approved')}>hold</button>
              </td>
              {/* <td>
                <button onClick={() => handleManagerResponse(submission._id, 'Manager response')}>
                  Add Manager Response
                </button>
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
