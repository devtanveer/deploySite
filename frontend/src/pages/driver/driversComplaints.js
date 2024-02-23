import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLocation } from '@fortawesome/free-solid-svg-icons';

const ComplaintsListd = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:4000/complaints/assigned');
                setComplaints(response.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };

        fetchComplaints();
    }, []);

    const handleStatusChange = async (complaintId, newStatus) => {
        try {
            const response = await axios.post(`http://localhost:4000/update-complaint-status/${complaintId}`, { status: newStatus });
            console.log('Complaint status updated successfully:', response.data);
            // Update the local state or perform any necessary actions after successful update
            window.location.reload(); // Reload the page after confirmation

        } catch (error) {
            console.error('Error updating complaint status:', error);
            // Handle error, display error message, etc.
        }
    };

   

    return (
        <div>
            <h2>Complaints with Assigned Drivers</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%', background: '#f0f0f0' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Bin Photo</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Complaint Id</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Submitted By</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Assigned Driver</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(complaint => (
                        <tr key={complaint._id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}><img src={complaint.binPhoto} alt="Bin Photo" style={{ width: '100px' }} /></td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{complaint.complaintId}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{complaint.userName}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{complaint.status}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{complaint.assignedDriver}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}> 
                                {complaint.status !== 'Done' && (
                                    <FontAwesomeIcon icon={faCheck} onClick={() => handleStatusChange(complaint.complaintId, "Completed")} style={{ cursor: 'pointer' }} /> 
                                )} 
                                <span style={{ cursor: 'pointer' }} onClick={() => handleStatusChange(complaint.complaintId, "Completed")}>Mark As Done</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComplaintsListd;
