import React, { useEffect, useState } from 'react';
import axios from 'axios'; // You may need to install axios
// import Submission from '../studentbackend/models/Submission';
// import './interviewResponse.css'
function InterviewResponse() {
  const [submissions, setSubmissions] = useState([]);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000+00:00`;
  };
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
  const handleRequest= async (id) =>{
    try {
      const response = await axios.post('http://localhost:5000/api/send-candidate',{
        candidateId:id
      }); // Adjust the API endpoint accordingly
      console.log("whats data",response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  } 
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
            <th>Manager First response date and time</th>
            <th>Manager Second Status Request</th>
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
              <td>{submission.interviewDate ? new Date(submission.interviewDate).toLocaleString() :'-'}</td>
              <td>{submission.jobProfile}</td>
              <td>{submission.status}</td>
              {/* Add more table cells for other fields */}
              <td><button type='button' onClick={()=>handleRequest(submission._id)}>Send Request</button></td>
              <td>{submission.responseDate ? new Date(submission.responseDate).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterviewResponse;
