import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    binPhoto: null, // Updated to store the file object
    location: '',
    userName: '',
    userPhone: '',
    binAddress: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'binPhoto') {
      // If the target is the bin photo input, set the file object
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // Get the first file from the files array
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formDataWithFile = new FormData(); // Create FormData object
        formDataWithFile.append('binPhoto', formData.binPhoto); // Append the file object
        formDataWithFile.append('location', formData.location);
        formDataWithFile.append('userName', formData.userName);
        formDataWithFile.append('userPhone', formData.userPhone);
        formDataWithFile.append('binAddress', formData.binAddress);
    
        const response = await axios.post('http://localhost:4000/addComplaint', formDataWithFile, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
          },
        });
    
        console.log(response.data);
        setSuccessMessage('Complaint added successfully!');
        setError('');
        
        // Clear the form data after successful submission
        setFormData({
          binPhoto: null,
          location: '',
          userName: '',
          userPhone: '',
          binAddress: ''
        });
      } catch (error) {
        console.error('Error adding complaint:', error.response.data);
        setSuccessMessage('');
        setError('Failed to add complaint. Please check your information.');
      }
    };

  return (
    <div className="container my-3 py-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Add New Complaint</h2>
          <hr></hr>
          <form className="complaintForm" onSubmit={handleSubmit}>
          
          
          <div className="mb-3">
              <label htmlFor="userName" className="form-label">You Name:</label>
              <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="userPhone" className="form-label">Your Phone:</label>
              <input type="text" name="userPhone" value={formData.userPhone} onChange={handleChange} className="form-control" required />
            </div>
           
           
            <div className="mb-3">
              <label htmlFor="binPhoto" className="form-label">Bin Photo:</label>
              <input type="file" name="binPhoto" onChange={handleChange} className="form-control" accept="image/*" required />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">Bin Location:</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" required />
            </div>


            <div className="mb-3">
              <label htmlFor="binAddress" className="form-label">Bin Address:</label>
              <input type="text" name="binAddress" value={formData.binAddress} onChange={handleChange} className="form-control" required />
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-info">Add Complaint</button>

            {successMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
