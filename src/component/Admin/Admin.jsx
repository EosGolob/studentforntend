import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../Login/Login';


const isAdmin = true;

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
  const handleLogin = (email) => {
    console.log(`Logged in with email: ${email}`);
    // You can implement additional logic here after the user logs in
  };
  console.log('response ',submissions)
  return (
    <div className="admin-panel-container" style={styles.container}>
      {/* <Login onLogin={handleLogin} isAdmin={isAdmin} /> */}
      <h2 style={styles.heading}></h2>
      <table style={styles.table}>
        <thead style={styles.table2}>
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
            <th>maritalStatus</th>
            <th>refferral</th>
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

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    border: '2px solid red',
    borderRadius: '10px',
    maxWidth: '800px', // Adjusted maximum width for better readability
    margin: 'auto', // To center the container horizontally
  },
  heading: {
    color: 'black',
    background: 'red',
    textAlign: 'center', // Centering the heading text
  },
  tableContainer: {
    overflowX: 'auto', // Enable horizontal scrolling for the table
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  table2: {
    background: 'red',
  },
  tableHeader: {
    background: 'red', // Red background for table header
    color: 'black', // Black font color
    padding: '8px', // Padding for the header cells
    textAlign: 'left', // Align header text to the left
    fontWeight: 'bold', // Bold font for header text
  },
  tableRow: {
    borderBottom: '1px solid #ddd', // Gray border for table rows
  },
  tableCell: {
    padding: '8px', // Adjust cell padding
    textAlign: 'left', // Align cell text to the left
    border: '1px solid #ddd', // Add border to each cell
    overflow: 'hidden', // Hide overflow content
    whiteSpace: 'nowrap', // Prevent wrapping
    textOverflow: 'ellipsis', // Show ellipsis for overflow text
  },
  actionButtons: {
    textAlign: 'center', // Centering the action buttons in the table cell
  },
};
export default AdminPanel;
