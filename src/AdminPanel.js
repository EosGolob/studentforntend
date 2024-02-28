import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

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
    } catch (error) {
      console.error('Error updating submission status:', error);
    }
  };
  console.log('response ',submissions)
  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>
      <table>
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
