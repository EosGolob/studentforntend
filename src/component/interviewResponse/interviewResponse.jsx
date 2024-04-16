import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './interviewResponse.css'
import Pagination from "react-js-pagination";

function InterviewResponse() {
  const [submissions, setSubmissions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000+00:00`;
  };

  const handleRequest = async (id, firstName, email, jobProfile) => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-candidate', {
        // candidateId:id,
        firstName,
        email,
        jobProfile
      }); // Adjust the API endpoint accordingly
      console.log("Response", response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handlePageChange = (PageNumber) => {
    setPageNumber(PageNumber);
  };
  const indexOfLastSubmission = pageNumber * pageSize;
  const indexOfFirstSubmission = indexOfLastSubmission - pageSize;
  const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);


  


  return (
    <div>
      <table id="submissionTable" className="interviewResponse-table">
        <thead >
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Job Profile</th>
            <th>Manager First status</th>
            <th>Manager First response date and time</th>
            <th>Manager Second Status Request</th>
            <th>Manager second status</th>
          </tr>
        </thead>
        <tbody>
          {currentSubmissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission.firstName}</td>
              <td>{submission.lastName}</td>
              <td>{submission.email}</td>
              <td>{submission.jobProfile}</td>
              <td className={submission.status.toLowerCase()}>{submission.status}</td>
              <td>{submission.responseDate ? new Date(submission.responseDate).toLocaleString() : '-'}</td>
              <td>
                <div className="outer-btn">
                  <button style={{ backgroundColor: 'green', padding: '5px', cursor: 'pointer' }} className='manbutton' type='button' onClick={() => handleRequest(submission._id, submission.firstName, submission.email, submission.jobProfile)}>Send Response</button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <Pagination
          activePage={pageNumber}
          itemsCountPerPage={pageSize}
          totalItemsCount={submissions.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
export default InterviewResponse;

