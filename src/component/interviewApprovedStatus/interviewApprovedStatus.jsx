import React,{ useState, useEffect } from 'react';
import axios from 'axios';
// import './Admin.css';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from 'react-js-pagination';

function InterviewApprovedStatus() {
    const [submissions, setSubmissions] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);  
    const [pageSize] = useState(4);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    
    useEffect(() => {
      async function fetchSubmissions() {
        try {
          const response = await axios.get('http://localhost:5000/api/submissions');
          const sortedSubmissions = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setSubmissions(sortedSubmissions); 
          setTotalItemsCount(sortedSubmissions.length);
        } catch (error) {
          console.error('Error fetching submissions:', error);
        }
      }
      fetchSubmissions();
    }, []);
  
    const handlePageChange = (PageNumber) => {
      setPageNumber(PageNumber);
    };
  
    const filteredSubmissions = submissions.filter(submission => {
    const matchEmail = submission.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchStatus = submission.status.toLowerCase() === "ftf" || submission.status.toLowerCase() === "FTF";
    if (!searchDate) return matchEmail && matchStatus; 
    const submissionDate = new Date(submission.createdAt);
    const matchDate = submissionDate.toDateString() === searchDate.toDateString();
    return matchEmail && matchDate && matchStatus;
  }).slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  



      // Calculate start and end indices for pagination
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);
  
    const handleUpdateStatus = async (id, newStatus) => {
      try {
        const response = await axios.put(`http://localhost:5000/api/submissions/${id}/updateStatus`, { status: newStatus, responseDate: new Date() });
        console.log('Submission status updated:', response.data);
        
        // Update local state
        const updatedSubmission = response.data; // Assuming API returns updated submission object
        setSubmissions(prevSubmissions => {
        const updatedSubmissions = prevSubmissions.map(submission => {
        //   return prevSubmissions.map(submission => {
            if (submission._id === updatedSubmission._id) {
              // Add the new status change to status history
              const newStatusHistory = [...submission.statusHistory, { status: newStatus, date: updatedSubmission.responseDate }];
              return { ...submission, status: newStatus, responseDate: updatedSubmission.responseDate, statusHistory: newStatusHistory };
            }
            return submission;
          });
          return updatedSubmissions;
          // setSubmissions(updatedSubmissions);
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
      <DatePicker selected={searchDate} onChange={date => setSearchDate(date)} dateFormat="yyyy-MM-dd" placeholderText="Search by Interview Date" isClearable/> 
    </div>
    <br/>
    <table  id="submissionTable" className='admin-table'>
      <thead>
        <tr>
          <th>First Name</th>
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
          <th> Status </th>
        </tr>
      </thead>
      <tbody>
        {paginatedSubmissions.map(submission => (
          <tr key={submission._id}>
            <td>{submission.firstName}</td>
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
              <div className='outer-div-btn'>   
            {/*  <button className='inner-div-btn1' onClick={() => handleUpdateStatus(submission._id, 'Approved')} >Approve</button> */}
              <button className='inner-div-btn2' onClick={() => handleUpdateStatus(submission._id, 'SFTF')} >SELECTED FOR FTF</button>
             <button className='inner-div-btn3' onClick={() => handleUpdateStatus(submission._id, 'RFTF')} >REJECTED FOR FTF</button>
              </div>
            </td>
            
            <td>{submission.responseDate ? new Date(submission.responseDate).toLocaleString() : '-'}</td>
            {/* <td> {submission.statusHistory.map((historyItem, index) => (
                 <div key={index}>
                 {historyItem.status} - {new Date(historyItem.date).toLocaleString()}
            </div>
            ))}</td> */}
            <td>{submission.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination
       activePage={pageNumber}
       itemsCountPerPage={pageSize}
       totalItemsCount={(submissions || []).length}
       pageRangeDisplayed={5}
       onChange={handlePageChange}
    />
  </div>
);
};

export default InterviewApprovedStatus