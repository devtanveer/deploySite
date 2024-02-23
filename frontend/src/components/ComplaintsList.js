import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints from the backend
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:4000/complaints');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  // Fetch complaints when the component mounts
  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div >
      <h2>Complaints List</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{backgroundColor: 'white'}}>
            <th>Bin Photo</th>
            <th>User Name</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Bin Address</th>
            <th>Complaint Status</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor: 'whitesmoke'}}>
          {complaints.map((complaint) => (
            <tr key={complaint._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>
                {complaint.binPhoto ? (
                  <img src={complaint.binPhoto} alt="Bin" style={{ maxWidth: '150px' }} />
                ) : (
                  <span>No image available</span>
                )}
              </td>
              <td style={{ padding: '10px' }}>{complaint.userName}</td>
              <td style={{ padding: '10px' }}>{complaint.location}</td>
              <td style={{ padding: '10px' }}>{complaint.userPhone}</td>
              <td style={{ padding: '10px' }}>{complaint.binAddress}</td>
              <td style={{ padding: '10px' }}>{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsList;
