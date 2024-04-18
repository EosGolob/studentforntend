import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ReInterviewSchedule() {
    const [empolyees, setEmployee] = useState([]);

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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th> First Name</th>
                        <th> Last Name </th>
                        <th>Email </th>
                        <th> Status</th>
                    </tr>
                </thead>
                <tbody>
                    {empolyees.map(empolyee => {
                        if (empolyee.status === "Rejected"||empolyee.status === "rejected") {
                            return (
                                <tr key={empolyee._id}>
                                    <td>{empolyee.firstName}</td>
                                    <td>{empolyee.lastName}</td>
                                    <td>{empolyee.email}</td>
                                    <td>{empolyee.status}</td>
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