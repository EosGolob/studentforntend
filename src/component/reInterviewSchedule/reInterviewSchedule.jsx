import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reInterviewSchedule.css';

function ReInterviewSchedule() {
    const [employees, setEmployee] = useState([]);
    const [submission, setSubmissions] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/submissions');
            setEmployee(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/submissions/${id}/updateStatus`, { status: newStatus, responseDate: new Date() });
            console.log('Submission status updated:', response.data);
            
            // Update local state
            const updatedSubmission = response.data; // Assuming API returns updated submission object
            setSubmissions(prevSubmissions => {
                const updatedSubmissions = prevSubmissions.map(submission => {
                    if (submission._id === updatedSubmission._id) {
                        // Add the new status change to status history
                        const newStatusHistory = [...submission.statusHistory, { status: newStatus, date: updatedSubmission.responseDate }];
                        return { ...submission, status: newStatus, responseDate: updatedSubmission.responseDate, statusHistory: newStatusHistory };
                    }
                    return submission;
                });
                return updatedSubmissions;
            });
        } catch (error) {
            console.error('Error updating submission status:', error);
        }
    };
    
    // Add this function to handle dropdown selection change
    const handleDropdownChange = (id, e) => {
        const newStatus = e.target.value;
        handleStatusChange(id, newStatus);
    };
    
    return (
        <div>
            <table  className='reInterviewResponse-table'>
                <thead>
                    <tr>
                        <th> First Name</th>
                        <th> Last Name </th>
                        <th>Email </th>
                        <th> Status</th>
                        <th> Re_Interview_Schedule</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(empolyee => {
                        if (empolyee.status === "Rejected"||
                            empolyee.status === "rejected"|| 
                            empolyee.status === "Hold" || 
                            empolyee.status ==="hold"|| 
                            empolyee.status ==="RFTF"|| 
                            empolyee.status =="RMR") {
                            return (
                                <tr key={empolyee._id}>
                                    <td>{empolyee.firstName}</td>
                                    <td>{empolyee.lastName}</td>
                                    <td>{empolyee.email}</td>
                                    <td>{empolyee.status}</td>                              
                                 <td>
                                 <select
                                     value={empolyee.status}
                                     onChange={(e) => handleDropdownChange(empolyee._id, e)}
                                 >
                                     <option value="Rejected">Rejected</option>
                                     {/* <option value="Hold">Hold</option>
                                     <option value="RFTF">RFTF</option>
                                     <option value="RMR">RMR</option> */}
                                     <option value="Interviewing">Interviewing </option>
                                 </select>
                             </td>
                             </tr>
                            );
                        } else {
                            return null;
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ReInterviewSchedule