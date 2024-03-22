import React, { useState } from 'react';
import './registerform.css'
const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    firstName:'',
    middleName:'',
    lastName:'',
    email:'',
    // password:'',
    // interviewDate:'',
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
 
  const [errors, setErrors] = useState({
    emailUnique:'',
  });
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
     'lastName', 'email',
     'jobProfile', 'qualification', 'phoneNo', 
     'permanentAddress', 'currentAddress', 
     'adharNo', 'panNo', 'gender', 'previousEmployee', 
     'dob', 'maritalStatus', 'referral'];
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
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
        newErrors.phoneNo = 'Phone number is required';
        valid = false;
      } else if (!/^\+91[0-9]{10}$/.test(formData.phoneNo)) {
        newErrors.phoneNo = 'Invalid phone number format (e.g., +91XXXXXXXXXX)';
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
        const data = await response.json();
      //   throw new Error('Submission failed');
      // }
      if (data.errors && data.errors.email && data.errors.email.kind === 'unique') {
        // Handle unique constraint violation error
        setErrors(prevErrors => ({
          ...prevErrors,
          emailUnique: 'Email address already exists'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          emailUnique: 'Email should be unique '
        }));
        throw new Error('Submission failed');
    }
  }
   } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <div className='container'>
      
      <form className='formclass' onSubmit={handleSubmit}>
        <h2 className='header'>Employee Register Form</h2> 
        <div className='firstname'>
        <label>
          First :
          <input type="text" name="firstName" placeholder='Enter your First Name' value={formData.firstName} onChange={handleChange} required />
          {errors.firstName && <p>{errors.firstName}</p>}
        </label>
        </div> 
        <div className='middlename'>
        <label>
          Middle :
          <input type="text" name="middleName" placeholder='Enter your Middle Name' value={formData.middleName} onChange={handleChange} required />
          {errors.middleName && <p>{errors.middleName}</p>}
       </label>
       </div>
       <div className='lastname'>
        <label >
          Last :
          <input type="text" name="lastName"  placeholder='Enter your Last Name'value={formData.lastName} onChange={handleChange} required />
          {errors.lastName && <p>{errors.lastName}</p>}
        </label>
        </div>
        <div className='email'>
        <label >
          Email :
          <input type="email" name="email"  placeholder= 'Enter your Email xyz@gmail.com' value={formData.email} onChange={handleChange} required  />
          {errors.email && <p>{errors.email}</p>}
          {errors.emailUnique && <p>{errors.emailUnique}</p>}
        </label>
        </div>
       {/*
        <label >
          Interview Date:
          <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required />
          {errors.interviewDate && <p>{errors.interviewDate}</p>}
        </label>
      */}
      <div className='position'>
        <label>
          Position :
          <textarea name="jobProfile" value={formData.jobProfile} onChange={handleChange} required placeholder='Position Applied For'  />
          {errors.jobProfile && <p >{errors.jobProfile}</p>}
        </label>
        </div>
        <div className='qualification'>
        <label>
          Qualification :
          <textarea name="qualification" placeholder="Enter your Education Qualification"value={formData.qualification} onChange={handleChange} required />
          {errors.qualification && <p>{errors.qualification}</p>}
        </label>
        </div>
        <div className='mobNo'>
        <label>
          Mobile :
          <input type="tel" name="phoneNo" placeholder='Enter your Mobile No' value={formData.phoneNo} onChange={handleChange} required  />
          {errors.phoneNo && <p>{errors.phoneNo}</p>}
        </label>
        </div>
        {/** 
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p>{errors.password}</p>}
        </label>
        */}
        <div className='permanentAdd'>
        <label>
          Permanent :
          <input type="text" name="permanentAddress" placeholder="Enter your permanent house Address"value={formData.permanentAddress} onChange={handleChange} />
          {errors.permanentAddress && <p>{errors.permanentAddress}</p>}
        </label>
        </div>
        <div className='currentAdd'>
        <label>
          Current :
          <input type="text" name="currentAddress" placeholder='Enter your current Address' value={formData.currentAddress} onChange={handleChange}  />
          {errors.currentAddress && <p>{errors.currentAddress}</p>}
        </label>
        </div>
        <div className='aadharNo'>
        <label>
          Aadhar :
          <input type="text" placeholder='Enter your 16 digit Aadhar No' name="adharNo" value={formData.adharNo} onChange={handleChange} />
          {errors.adharNo && <p>{errors.adharNo}</p>}
        </label>
        </div>
        <div className='panNo'>
        <label>
          Pan :
          <input type="text" name="panNo" placeholder='Enter your pan no' value={formData.panNo} onChange={handleChange} />
          {errors.panNo && <p>{errors.panNo}</p>}
        </label>
        </div>
        <div className='gender'>
        <label>
          Gender :         
          <select name="gender" value={formData.gender} onChange={handleChange} required >
          <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </select>
          {errors.gender && <p >{errors.gender}</p>}
        </label>
        </div>
        <div className='previousEmp'>
        <label>
          Previous Employee :
          <input type="text" name="previousEmployee" placeholder="Enter you last company name"value={formData.previousEmployee} onChange={handleChange}/>
          {errors.previousEmployee && <p>{errors.previousEmployee}</p>}
        </label>
        </div>
        <div className='dob'>
        <label>
          Date of Birth :
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          {errors.dob && <p>{errors.dob}</p>}
        </label>
        </div>
        <div className='marital'>
        <label>
          Marital Status :
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          {errors.maritalStatus && <p>{errors.maritalStatus}</p>}
        </label>
        </div>
        <div className='referral'>
        <label>
          Referral :
          <input type="text" name="referral" placeholder="Enter person who reffer you"value={formData.referral} onChange={handleChange} />
          {errors.referral  && <p>{errors.referral }</p>}
        </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmissionForm;
