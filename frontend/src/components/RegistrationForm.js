import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    userId: '',
    Role: 'user',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,      
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/users', {
        ...formData,
      });
  
      console.log(response.data);
      setSuccessMessage('Registration successful!');
      setError('');
    } catch (error) {
      console.error('Error registering user:', error.response.data);
      setSuccessMessage('');
      setError('Registration failed. Please check your information. Email and User ID must be Unique');
    }
  };
  
  

  return (
    <div className='container rounded my-3 py-3'>
    <div className="container " >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="contactForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="userId" className="form-label">User ID:</label>
              <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                {error}
              </div>
            )}

            

            
                        
            
            <button type="submit" className="btn btn-info">Register</button>

             
            {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
                {successMessage}
            </div>
            )}


            <h6>Already a member? Login Here:  <Link to="/userlogin" className="btn btn-success mx-2">Login</Link></h6>
            
           
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegistrationForm;
