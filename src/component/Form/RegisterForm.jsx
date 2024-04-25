import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './registerform.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleRobbery,faUser,faEnvelope, faGraduationCap, faMobileScreenButton, faLocationDot, faIdCard, faAddressCard, faBuilding, faPen } from '@fortawesome/free-solid-svg-icons';

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    // middleName:'',
    lastName: '',
    email: '',
    // password:'',
    // interviewDate:'',
    jobProfile: '',
    qualification: '',
    phoneNo: '',
    permanentAddress: '',
    currentAddress: '',
    adharNo: '',
    panNo: '',
    gender: '',
    previousEmployee: '',
    dob: '',
    maritalStatus: '',
    referral: ''
  });


  const [errors, setErrors] = useState({
    emailUnique: '',
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


  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast.success('Registration Successful');
        console.log('Submission successful', result);
        setFormData({
          firstName: '', middleName: '', lastName: '', email: '', jobProfile: '', qualification: '',
          phoneNo: '', permanentAddress: '', currentAddress: '', adharNo: '', panNo: '', gender: '',
          previousEmployee: '', dob: '', maritalStatus: '', referral: ''
        });
      } else {
        const data = await response.json();
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

  const validateForm = () => {
    let valid = true;
    const newErrors = {}

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


  return (
    <div className='container'>
      <h2>Registration Form </h2>
      <div className='from-container'>
        <ToastContainer />
        <form className='formclass' onSubmit={handleSubmit}>
          <div className='input-name'>
            <i><FontAwesomeIcon className='nameicon' icon={faUser} /></i>
            <input type="text" className='name' name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} required />
            {errors.firstName && <p>{errors.firstName}</p>}
            {/* <span>
          <i><FontAwesomeIcon className = 'nameicon' icon={faUser} /></i>
          <input type="text"  className='name' name="middleName" placeholder='Middle Name' value={formData.middleName} onChange={handleChange} required />
          {errors.middleName && <p>{errors.middleName}</p>}
          </span> */}
            <span>
              <i><FontAwesomeIcon className='nameicon' icon={faUser} /></i>
              <input type="text" className='name' name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} required />
              {errors.lastName && <p>{errors.lastName}</p>}
            </span>
          </div>

          <div className='input-name'>
            <i><FontAwesomeIcon className='nameicon' icon={faAddressCard} /></i>
            <input type="text" className='name' placeholder=' Enter your 16 digit Aadhar No' name="adharNo" value={formData.adharNo} onChange={handleChange} />
            {errors.adharNo && <p>{errors.adharNo}</p>}
            <span>
              <i><FontAwesomeIcon className='nameicon' icon={faIdCard} /></i>
              <input type="text" className='name' name="panNo" placeholder=' Enter your pan no' value={formData.panNo} onChange={handleChange} />
              {errors.panNo && <p>{errors.panNo}</p>}
            </span>
          </div>

          <div className='input-email'>
            <i><FontAwesomeIcon className='emailicon' icon={faEnvelope} /></i>
            <input type="email" className="inputemail" name="email" placeholder='Email:xyz@gmail.com' value={formData.email} onChange={handleChange} required />
            {errors.email && <p>{errors.email}</p>}
            {errors.emailUnique && <p>{errors.emailUnique}</p>}
          </div>

          <div className='input-email'>
            <i><FontAwesomeIcon className='emailicon' icon={faMobileScreenButton} /></i>
            <input type="tel" className='inputemail' name="phoneNo" placeholder='Mobile No' value={formData.phoneNo} onChange={handleChange} required />
            {errors.phoneNo && <p>{errors.phoneNo}</p>}
          </div>

          {/*
        <label >
          Interview Date:
          <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required />
          {errors.interviewDate && <p>{errors.interviewDate}</p>}
        </label>
      */}

          <div className='input-name'>
            {/* <textarea name="jobProfile" value={formData.jobProfile} onChange={handleChange} required placeholder='Position Applied For'  /> */}
            <i><FontAwesomeIcon className='nameicon' icon={faPen} /></i>
            <input className='name' name="jobProfile" value={formData.jobProfile} onChange={handleChange} required placeholder='Position Applied For'></input>
            {errors.jobProfile && <p >{errors.jobProfile}</p>}

            <span>
              <i><FontAwesomeIcon className='nameicon' icon={faGraduationCap} /></i>
              {/* <textarea name="qualification" placeholder="Enter your Education Qualification"value={formData.qualification} onChange={handleChange} required /> */}
              <input className='name' name="qualification" placeholder=" Education Qualification" value={formData.qualification} onChange={handleChange} required ></input>
              {errors.qualification && <p>{errors.qualification}</p>}
            </span>
          </div>


        

          <div className='input-name'>
            <i><FontAwesomeIcon className='nameicon' icon={faLocationDot} /></i>
            <input type="text" className='name' name="permanentAddress" placeholder="Permanent Address" value={formData.permanentAddress} onChange={handleChange} />
            {errors.permanentAddress && <p>{errors.permanentAddress}</p>}
            <span>
              <i><FontAwesomeIcon className='nameicon' icon={faLocationDot} /></i>
              <input type="text" className='name' name="currentAddress" placeholder='Current Address' value={formData.currentAddress} onChange={handleChange} />
              {errors.currentAddress && <p>{errors.currentAddress}</p>}
            </span>
          </div>

          <div className='input-name'>
            <i><FontAwesomeIcon className='nameicon' icon={faBuilding} /></i>
            <input type="text" className='name' name="previousEmployee" placeholder="Enter you last company name" value={formData.previousEmployee} onChange={handleChange} />
            {errors.previousEmployee && <p>{errors.previousEmployee}</p>}
            <span>
              <i><FontAwesomeIcon className='nameicon' icon={faPeopleRobbery} /></i>
              <input type="text" className='name' name="referral" placeholder=" Refferal Person" value={formData.referral} onChange={handleChange} />
              {errors.referral && <p>{errors.referral}</p>}
            </span>
          </div>

          <div className='gender'>
            <select className='select-gender' name="gender" value={formData.gender} onChange={handleChange} required >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p >{errors.gender}</p>}
         
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            {errors.maritalStatus && <p>{errors.maritalStatus}</p>}
          </div>

         


          <div className='input-dob'>
            Date of Birth :
            {/* <i><FontAwesomeIcon className='jobprofileicon' icon={faCalendar} /></i> */}
            <input type="date" className='birthdate' name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <p>{errors.dob}</p>}
          </div>

          {/* <div className='marital'>       
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          {errors.maritalStatus && <p>{errors.maritalStatus}</p>}
        </div> */}

 
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p>{errors.password}</p>}
        </label>
        

          <div className='input-submitbtn'>
            <button type="submit">Submit</button>
          </div>


        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
