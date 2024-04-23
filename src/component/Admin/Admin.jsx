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
  const [selectedSubmission, setSelectedSubmission] = useState(null);


  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions');
        const sortedSubmissions = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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


  const handleFirstNameClick = (submission) => {
    setSelectedSubmission(submission);
  };
  // Filter submissions based on search criteria
  const filteredSubmissions = submissions.filter(submission => {
    const matchEmail = submission.email.toLowerCase().includes(searchEmail.toLowerCase());
    if (!searchDate) return matchEmail;
    const submissionDate = new Date(submission.createdAt);
    const matchDate = submissionDate.toDateString() === searchDate.toDateString();
    return matchEmail && matchDate;
  }).slice((pageNumber - 1) * pageSize, pageNumber * pageSize);


  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/submissions/${id}/updateStatus`, { status: newStatus, responseDate: new Date() });
      console.log('Submission status updated:', response.data);

      // Update local state
      const updatedSubmission = response.data; // Assuming API returns updated submission object
      setSubmissions(prevSubmissions => {
        return prevSubmissions.map(submission => {
          if (submission._id === updatedSubmission._id) {
            // Add the new status change to status history
            const newStatusHistory = [...submission.statusHistory, { status: newStatus, date: updatedSubmission.responseDate }];
            return { ...submission, status: newStatus, responseDate: updatedSubmission.responseDate, statusHistory: newStatusHistory };
          }
          return submission;
        });
      });
    } catch (error) {
      console.error('Error updating submission status:', error);
    }
  };

  return (
    <div className="admin-panel-container" >
      <div className="search-fields">
        <input
          type="text" placeholder="Search by Email" value={searchEmail} onChange={e => setSearchEmail(e.target.value)} />
        <DatePicker selected={searchDate} onChange={date => setSearchDate(date)} dateFormat="yyyy-MM-dd" placeholderText="Search by Interview Date" isClearable />
      </div>
      <br />
      <table id="submissionTable" className='admin-table'>
        <thead>
          <tr>
            <th>Name</th>
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
            {/* <th>Response Date</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map(submission => (
            <tr key={submission._id}>
              <td onClick={() => handleFirstNameClick(submission)} style={{ cursor: 'pointer', color: 'blue' }}>{submission.firstName} {submission.lastName}</td>
              <td>{submission.email}</td>
              <td>{submission.createdAt ? new Date(submission.createdAt).toLocaleString() : '-'}</td>
              <td>{submission.jobProfile}</td>
              <td>{submission.qualification}</td>
              <td>{submission.phoneNo}</td>
              <td>{submission.permanentAddress}</td>
              <td>{submission.currentAddress}</td>
              <td>{submission.adharNo}</td>
              <td>{submission.panNo}</td>
              <td>{submission.gender}</td>
              <td>{submission.previousEmployee}</td>
              <td>{submission.dob ? new Date(submission.dob).toLocaleString() : '-'}</td>
              <td>{submission.maritalStatus}</td>
              <td>{submission.referral}</td>
              {/* <td> 
                <div className='outer-div-btn'>   
                <button className='inner-div-btn1' onClick={() => handleUpdateStatus(submission._id, 'Approved')} >Approve</button>
                <button className='inner-div-btn2' onClick={() => handleUpdateStatus(submission._id, 'Rejected')} >Reject</button>
                <button className='inner-div-btn3' onClick={() => handleUpdateStatus(submission._id, 'Hold')} >hold</button>
                </div>
              </td> */}

              {/* <td>{submission.responseDate ? new Date(submission.responseDate).toLocaleString() : '-'}</td> */}
              {/* <td> {submission.statusHistory.map((historyItem, index) => (
                   <div key={index}>
                   {historyItem.status} - {new Date(historyItem.date).toLocaleString()}
              </div>
              ))}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedSubmission && (
        <div className="modal">
          <div className="modal-content">
            <p>Name: {selectedSubmission.firstName} {selectedSubmission.lastName}</p>
            <p>Last Response : {selectedSubmission.status}</p>
            <p>No of Attemps Count: {selectedSubmission.statusHistory.filter(historyItem => historyItem.status.includes('Interviewing'||'interviewing')).length}</p>
            <p>History:{selectedSubmission.statusHistory.map((historyItem,index) =>
             <div key ={index}>
              {historyItem.status } - {new Date(historyItem.date).toLocaleString()}
             </div>
            )}</p>
            <button onClick={() => setSelectedSubmission(null)}>Close</button>
          </div>
        </div>
      )}
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
