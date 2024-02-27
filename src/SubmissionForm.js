import React, { useState } from 'react';

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectTitle: '',
    projectDescription: '',
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
        // Handle success (e.g., showing a success message, clearing the form)
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., showing an error message)
    }
  };
    // console.log('Form data:', formData);
    // Here you would typically send the data to the backend server
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Project Submission Form</h2>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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
        Project Title:
        <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <label>
        Project Description:
        <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} required />
      </label>
      <br/>
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmissionForm;