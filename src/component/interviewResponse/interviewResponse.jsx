import React, { useEffect, useState } from 'react';
import axios from 'axios'; // You may need to install axios
// import './interviewResponse.css'
function InterviewResponse() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions'); // Adjust the API endpoint accordingly
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <table id="submissionTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Interview Date</th>
            <th>Job Profile</th>
            <th>Manager First status</th>
            <th>Manager second status</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission.firstName}</td>
              <td>{submission.lastName}</td>
              <td>{submission.email}</td>
              <td>{submission.interviewDate}</td>
              <td>{submission.jobProfile}</td>
              <td>{submission.status}</td>
              {/* Add more table cells for other fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterviewResponse;
