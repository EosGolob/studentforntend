import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from 'react-js-pagination';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchDate, setSearchDate] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);  
  const [pageSize] = useState(4);
  
  
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions');
        const sortedSubmissions = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // setSubmissions(response.data);
        setSubmissions(sortedSubmissions); 
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    }
    fetchSubmissions();
  }, []);

  const handlePageChange = (PageNumber) => {
    setPageNumber(PageNumber);
  };

  // Filter submissions based on search criteria
    const filteredSubmissions = submissions.filter(submission => {
    const matchEmail = submission.email.toLowerCase().includes(searchEmail.toLowerCase());
    if (!searchDate) return matchEmail; 
    const submissionDate = new Date(submission.interviewDate);
    const matchDate = submissionDate.toDateString() === searchDate.toDateString();
    return matchEmail && matchDate;
    }).slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  
    
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updatedSubmissions = submissions.map(submission => {
        if (submission._id === id) {
          return { ...submission, status: newStatus, responseDate: new Date() };
          // Ensure to set responseDate to current date and time
        }
        return submission;
      });
  
      const response = await axios.put(`http://localhost:5000/api/submissions/${id}/updateStatus`, { status: newStatus, responseDate: new Date() });
      console.log('Submission status updated:', response.data);
      setSubmissions(updatedSubmissions);
    } catch (error) {
      console.error('Error updating submission status:', error);
    }
  };
  
  return (
    <div className="admin-panel-container" >
      <div className="search-fields">
        <input
          type="text" placeholder="Search by Email" value={searchEmail} onChange={e => setSearchEmail(e.target.value)} />
        <DatePicker selected={searchDate} onChange={date => setSearchDate(date)} dateFormat="yyyy-MM-dd" placeholderText="Search by Interview Date" isClearable/> 
      </div>
      <br/>
    
      <table  id="submissionTable" className='admin-table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th className='active-row'>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Employee Register Date</th>
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
            <th>Response Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission.firstName}</td>
              <td>{submission.middleName}</td>
              <td>{submission.lastName}</td>
              <td>{submission.email}</td>
              <td>{submission.createdAt ? new Date (submission.createdAt).toLocaleString():'-'}</td>
              <td>{submission.jobProfile}</td>
              <td>{submission.qualification}</td>
              <td>{submission.phoneNo}</td>
              <td>{submission.permanentAddress}</td>
              <td>{submission.currentAddress}</td>
              <td>{submission.adharNo}</td>
              <td>{submission.panNo}</td>
              <td>{submission.gender}</td>
              <td>{submission.previousEmployee}</td>
              <td>{submission.dob ? new Date(submission.dob).toLocaleString():'-'}</td>
              <td>{submission.maritalStatus}</td>
              <td>{submission.referral}</td> 
              <td>
                <button onClick={() => handleUpdateStatus(submission._id, 'approved')} >Approve</button>
                <button onClick={() => handleUpdateStatus(submission._id, 'rejected')} >Reject</button>
                <button onClick={() => handleUpdateStatus(submission._id, 'hold')} >hold</button>
              </td>
              <td>{submission.responseDate ? new Date(submission.responseDate).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
         activePage={pageNumber}
         itemsCountPerPage={pageSize}
         totalItemsCount={submissions.length}
         pageRangeDisplayed={5}
         onChange={handlePageChange}
      />
    </div>
  );
};

export default AdminPanel;
