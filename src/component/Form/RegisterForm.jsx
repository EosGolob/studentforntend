import React, { useState } from 'react';
import './registerform.css'
const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    firstName:'',
    middleName:'',
    lastName:'',
    email:'',
    password:'',
    interviewDate:'',
    jobProfile:'',
    qualification:'',
    phoneNo:'',
    permanentAddress:'',
    currentAddress:'',
    adharNo:'',
    panNo:'',
    gender:'',
    previousEmployee:'',
    dob:'',
    maritalStatus:'',
    referral:''
  });
 
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  console.log('submiddion data', formData)

  const validateForm = () => {
    let valid = true;
    const newErrors  = {}
    
       // Validation logic for each field
    const requiredFields = ['firstName',
     'lastName', 'email', 'interviewDate', 
     'jobProfile', 'qualification', 'phoneNo', 
     'permanentAddress', 'currentAddress', 
     'adharNo', 'panNo', 'gender', 'previousEmployee', 
     'dob', 'maritalStatus', 'referral'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field} is required`;
        valid = false;
      }
    });
    
      // Email validation
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
        valid = false;
      }
    
      // Phone No validation
      if (!formData.phoneNo.trim()) {
        errors.phoneNo = 'Phone number is required';
        valid = false;
      } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phoneNo)) {
        errors.phoneNo = 'Invalid phone number format (e.g., 123-456-7890)';
        valid = false;
      }   
      setErrors(newErrors);
      return valid;
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the submission logic here
    if (!validateForm()) {
      return;
    }

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
    <div>
      <form className='formclass' onSubmit={handleSubmit}>
        <h2>Employee Register Form</h2>
        
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          {errors.firstName && <p>{errors.firstName}</p>}
        </label>
        
        <label>
          Middle Name:
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} required />
          {errors.middleName && <p>{errors.middleName}</p>}
       </label>
        
        <label >
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          {errors.lastName && <p>{errors.lastName}</p>}
        </label>
       
        <label >
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required  />
          {errors.email && <p>{errors.email}</p>}
        </label>
       
        <label >
          Interview Date:
          <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required />
          {errors.interviewDate && <p>{errors.interviewDate}</p>}
        </label>
       
        <label>
          Job Profile:
          <textarea name="jobProfile" value={formData.jobProfile} onChange={handleChange} required  />
          {errors.jobProfile && <p >{errors.jobProfile}</p>}
        </label>
       
        <label>
          Qualification:
          <textarea name="qualification" value={formData.qualification} onChange={handleChange} required />
          {errors.qualification && <p>{errors.qualification}</p>}
        </label>
       
        <label>
          Phone No:
          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required  />
          {errors.phoneNo && <p>{errors.phoneNo}</p>}
        </label>
        
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p>{errors.password}</p>}
        </label>
        
        <label>
          Permanent Address:
          <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
          {errors.permanentAddress && <p>{errors.permanentAddress}</p>}
        </label>
       
        <label>
          Current Address:
          <input type="text" name="currentAddress" value={formData.currentAddress} onChange={handleChange}  />
          {errors.currentAddress && <p>{errors.currentAddress}</p>}
        </label>
       
        <label>
          Adhar No:
          <input type="text" name="adharNo" value={formData.adharNo} onChange={handleChange} />
          {errors.adharNo && <p>{errors.adharNo}</p>}
        </label>
      
        <label>
          Pan No:
          <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} />
          {errors.panNo && <p>{errors.panNo}</p>}
        </label>
       
        <label>
          Gender:         
          <select name="gender" value={formData.gender} onChange={handleChange} required >
          <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </select>
          {errors.gender && <p >{errors.gender}</p>}
        </label>
       
        <label>
          Previous Employee:
          <input type="text" name="previousEmployee" value={formData.previousEmployee} onChange={handleChange}/>
          {errors.previousEmployee && <p>{errors.previousEmployee}</p>}
        </label>
       
        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          {errors.dob && <p>{errors.dob}</p>}
        </label>
        
        <label>
          Marital Status:
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          {errors.maritalStatus && <p>{errors.maritalStatus}</p>}
        </label>

        <label>
          Referral:
          <input type="text" name="referral" value={formData.referral} onChange={handleChange} />
          {errors.referral  && <p>{errors.referral }</p>}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );

};

export default SubmissionForm;
