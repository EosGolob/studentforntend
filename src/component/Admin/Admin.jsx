import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Admin.css';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css';
const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchDate, setSearchDate] = useState(null);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000+00:00`;
  };
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
  const filteredSubmissions = submissions.filter(submission => {
    const matchEmail = submission.email.toLowerCase().includes(searchEmail.toLowerCase());
    if (!searchDate) return matchEmail; // If search date is not set, only filter by email
    
    // Parse submission's interview date into Date object
    const submissionDate = new Date(submission.interviewDate);
    
    // Check if the submission date matches the selected date (ignoring time)
    const matchDate = submissionDate.toDateString() === searchDate.toDateString();
    
    return matchEmail && matchDate;
  });

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


  
  /*
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
  */
  return (
    <div className="admin-panel-container" >
      <div className="search-fields">
        <label>Filter By Date and Email: </label>
        <input
          type="text"
          placeholder="Search by Email"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
        />
        <DatePicker
          selected={searchDate}
          onChange={date => setSearchDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select Interview Date"
          isClearable
        />
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
          {filteredSubmissions.map(submission => (
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
                <button onClick={() => handleUpdateStatus(submission._id, 'approved')} >Approve</button>
                <button onClick={() => handleUpdateStatus(submission._id, 'rejected')} >Reject</button>
                <button onClick={() => handleUpdateStatus(submission._id, 'hold')} >hold</button>
              </td>
    
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
