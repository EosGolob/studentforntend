import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newEmployeeDetails.css';
import Pagination  from "react-js-pagination";

function NewEmployee() {
  const [submissions, setSubmissions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);

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


  const handlePageChange = (PageNumber) => {
    setPageNumber(PageNumber);
  };

  const indexOfLastSubmission = pageNumber * pageSize;
  const indexOfFirstSubmission = indexOfLastSubmission - pageSize;
  const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);
  

  return (
    <>
      <h1>Approved Submissions</h1>
      <table className ="employeesDetails-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Joining date</th>
            <th>Training start date</th>
            <th>EMP code</th>
          </tr>
        </thead>
        <tbody>
          {currentSubmissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission.firstName}</td>
              <td>{submission.lastName}</td>
              <td>{submission.email}</td>
              <td>{submission.joiningDate? new Date(submission.joiningDate).toLocaleString():'-'}</td>
              <td>{submission.trainingStartDate? new Date(submission.trainingStartDate).toLocaleString():'-'}</td>
              <td>{submission.employeeCode}</td>
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
    </>
  );
}

export default NewEmployee;
