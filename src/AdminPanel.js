import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get('/api/submissions');
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

  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Project Title</th>
            <th>Project Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission.name}</td>
              <td>{submission.email}</td>
              <td>{submission.projectTitle}</td>
              <td>{submission.projectDescription}</td>
              <td>{submission.status}</td>
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
