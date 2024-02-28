import React, { useState } from 'react';
import './Submission.css';

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    firstName:'',
    middleName:'',
    lastName:'',
    email:'',
    interviewDate:'',
    jobProfile:'',
    qualification:'',
    phoneNo:'',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the submission logic here
    try {
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });  
      if (response.ok) {
        const result = await response.json();
        console.log('Submission successful', result);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
    

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Empoloyee Register Form</h2>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <label>
        Middle Name:
        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <label>
      interview Date :
        <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <label>
      Job Profile:
        <textarea name="jobProfile" value={formData.jobProfile} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <label>
      Qualification:
        <textarea name="qualification" value={formData.qualification} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <label>
      phone No:
        <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmissionForm;