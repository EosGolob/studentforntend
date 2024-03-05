import React, { useState } from 'react';

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
  };

  const validateForm = () => {
    let valid = true;
    const errors = {}
    
      // First Name validation
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
        valid = false;
      }
    
      // Last Name validation
      if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required';
        valid = false;
      }
    
      // Email validation
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Invalid email address';
        valid = false;
      }
    
      // Interview Date validation
      if (!formData.interviewDate) {
        errors.interviewDate = 'Interview date is required';
        valid = false;
      }
    
      // Job Profile validation
      if (!formData.jobProfile.trim()) {
        errors.jobProfile = 'Job profile is required';
        valid = false;
      }
    
      // Qualification validation
      if (!formData.qualification.trim()) {
        errors.qualification = 'Qualification is required';
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
    
      // Permanent Address validation
      if (!formData.permanentAddress.trim()) {
        errors.permanentAddress = 'Permanent address is required';
        valid = false;
      }
    
      // Current Address validation
      if (!formData.currentAddress.trim()) {
        errors.currentAddress = 'Current address is required';
        valid = false;
      }
    
      // Adhar No validation
      if (!formData.adharNo.trim()) {
        errors.adharNo = 'Adhar number is required';
        valid = false;
      }
    
      // Pan No validation
      if (!formData.panNo.trim()) {
        errors.panNo = 'Pan number is required';
        valid = false;
      }
    
      // Gender validation
      if (!formData.gender) {
        errors.gender = 'Gender is required';
        valid = false;
      }
    
      // Previous Employee validation
      if (!formData.previousEmployee.trim()) {
        errors.previousEmployee = 'Previous employee information is required';
        valid = false;
      }
    
      // Date of Birth validation
      if (!formData.dob) {
        errors.dob = 'Date of birth is required';
        valid = false;
      }
    
      // Marital Status validation
      if (!formData.maritalStatus) {
        errors.maritalStatus = 'Marital status is required';
        valid = false;
      }
    
      // Referral validation
      if (!formData.referral.trim()) {
        errors.referral = 'Referral information is required';
        valid = false;
      }
    
      setErrors(errors);
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'white' }}>
      <form onSubmit={handleSubmit} style={{ border: '2px solid red', padding: '20px', borderRadius: '10px', backgroundColor: 'lightgray', width: '400px' }}>
        <h2 style={{ textAlign: 'center', color: 'black' }}>Employee Register Form</h2>
        
        <label style={{ color: 'black' }}>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.firstName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</p>}
        </label>
        
        <label style={{ color: 'black' }}>
          Middle Name:
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.middleName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.middleName}</p>}
       </label>
        
        <label style={{ color: 'black' }}>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.lastName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Interview Date:
          <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.interviewDate && <p style={{ color: 'red', fontSize: '12px' }}>{errors.interviewDate}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Job Profile:
          <textarea name="jobProfile" value={formData.jobProfile} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.jobProfile && <p style={{ color: 'red', fontSize: '12px' }}>{errors.jobProfile}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Qualification:
          <textarea name="qualification" value={formData.qualification} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.qualification && <p style={{ color: 'red', fontSize: '12px' }}>{errors.qualification}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Phone No:
          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.phoneNo && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phoneNo}</p>}
        </label>
        
        <label style={{ color: 'black' }}>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}
        </label>
        
        <label style={{ color: 'black' }}>
          Permanent Address:
          <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.permanentAddress && <p style={{ color: 'red', fontSize: '12px' }}>{errors.permanentAddress}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Current Address:
          <input type="text" name="currentAddress" value={formData.currentAddress} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.currentAddress && <p style={{ color: 'red', fontSize: '12px' }}>{errors.currentAddress}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Adhar No:
          <input type="text" name="adharNo" value={formData.adharNo} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.adharNo && <p style={{ color: 'red', fontSize: '12px' }}>{errors.adharNo}</p>}
        </label>
      
        <label style={{ color: 'black' }}>
          Pan No:
          <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.panNo && <p style={{ color: 'red', fontSize: '12px' }}>{errors.panNo}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Gender:         
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }}>
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            </select>
          {errors.maritalStatus && <p style={{ color: 'red', fontSize: '12px' }}>{errors.maritalStatus}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Previous Employee:
          <input type="text" name="previousEmployee" value={formData.previousEmployee} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.firstName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</p>}
        </label>
       
        <label style={{ color: 'black' }}>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.firstName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</p>}
        </label>
        
        <label style={{ color: 'black' }}>
          Marital Status:
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }}>
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          {errors.firstName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</p>}
        </label>

        <label style={{ color: 'black' }}>
          Referral:
          <input type="text" name="referral" value={formData.referral} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
          {errors.referral  && <p style={{ color: 'red', fontSize: '12px' }}>{errors.referral }</p>}
        </label>

        <button type="submit" style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '20px', width: '100%' }}>Submit</button>
      </form>
    </div>
  );

};

export default SubmissionForm;
