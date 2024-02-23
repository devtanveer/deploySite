import Dashboard from '../../components/dashboard';
import AdminProfile from './AdminProfile';
import UpdateUser from './UpdateUser'
import { Link } from 'react-router-dom';
import { faHome, faUser, faComments, faBinoculars, faIdBadge, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import React, { useState, useEffect } from 'react';
import { faPlay, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; // Import Modal from react-bootstrap
import axios from 'axios';

const AdminComplaint = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
      logout();
      navigate('/userlogin');
    };

    const [selectedDriver, setSelectedDriver] = useState('');
    
    const [selectedId, setSelectedId] = useState('');

    const [assignedDrivers, setAssignedDrivers] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [complaints, setComplaints] = useState([]);

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleShowModal = () => {
      setShowModal(true);
    };

   

    const handleAssignToDriver = (complaintId) => {
      setAssignedDrivers((prevAssignedDrivers) => ({
        ...prevAssignedDrivers,
        [complaintId]: selectedDriver,
      }));
      setSelectedDriver('');
      console.log(`Assigning complaint ${complaintId} to ${selectedDriver}.`);
    };

    const renderAssignedDriver = (complaintId) => {
      const assignedDriver = assignedDrivers[complaintId];
      return assignedDriver ? (
        <span>
          Assigned to: {assignedDriver}{' '}
          <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
        </span>
      ) : (
        <span>Click on Assign</span>
      );
    };

    // Fetch complaints from the backend
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:4000/complaints');
                setComplaints(response.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, []);

    // Fetch drivers from the backend
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/drivers');
                const driverNames = response.data.map(driver => driver.name);
                setDrivers(driverNames);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };
        fetchDrivers();
    }, []);

    const handleStatusChange = async (complaintId, newStatus) => {
      try {
          const response = await axios.post(`http://localhost:4000/update-complaint-status/${complaintId}`, { status: newStatus });
          console.log('Complaint status updated successfully:', response.data);
          // Update the local state or perform any necessary actions after successful update
      } catch (error) {
          console.error('Error updating complaint status:', error);
          // Handle error, display error message, etc.
      }
  };

    const handleInProgressButtonClick = (complaintId) => {
      const confirmation = window.confirm('Are you sure you want to change the status to "In Progress"?');
      if (confirmation) {
          console.log("Complaint ID:", complaintId);
          // Call the handleStatusChange function with the complaint ID and the new status
          handleStatusChange(complaintId, 'In Progress');
          window.location.reload(); // Reload the page after confirmation
      }
    };

    const handleInResolvedButtonClick = (complaintId) => {
      const confirmation = window.confirm('Are you sure you want to change the status to "Resolved"?');
      if (confirmation) {
        console.log("Complaint ID:", complaintId);
        // Call the handleStatusChange function with the complaint ID and the new status
        handleStatusChange(complaintId, 'Resolved');
        window.location.reload(); // Reload the page after confirmation
      }
    };


    const handleDriverSelection = async (complaintId, driver) => {
      try {
        console.log('Complaint ID:', complaintId);
        console.log('Selected Driver:', driver);
    
        // Make an HTTP POST request to your backend API endpoint
        const response = await axios.post('http://localhost:4000/assign-driver', {
          complaintId,
          driver
        });
    
        console.log('Response from backend:', response.data);
    
        // Update local state or perform any other necessary actions
        setSelectedDriver('');
        setAssignedDrivers(prevAssignedDrivers => ({
          ...prevAssignedDrivers,
          [complaintId]: driver
        }));
        handleCloseModal();
        window.location.reload(); // Reload the page after confirmation

      } catch (error) {
        console.error('Error assigning driver:', error);
        // Handle error, display error message, etc.
      }

    };

    const getStatusClass = (status) => {
      switch (status) {
        case 'New':
          return 'new-complaint';
        case 'In Progress':
          return 'in-progress';
        case 'Resolved':
          return 'resolved';
        default:
          return '';
      }
    };
    




    return (
      <div className="container-fluid">
        <h2>Admin Dashboard</h2>
        <div className="row border">
          {/* Sidebar */}
          <div id="sidebar" className="col-md-2">
            <div className="nav flex-column  ">
              <Link to="/admindashboard" className="nav-link">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
              <Link to="/adminprofile" className="nav-link">
                <FontAwesomeIcon icon={faUser} /> Update / Delete Users
              </Link>
              <Link to="/complaints" className="nav-link">
                <FontAwesomeIcon icon={faComments} /> View Complaints
              </Link>
              <Link to="/regions" className="nav-link">
                <FontAwesomeIcon icon={faBinoculars} /> View Bins / Regions
              </Link>
              <Link to="/profile" className="nav-link">
                <FontAwesomeIcon icon={faIdBadge} /> Admin Profile
              </Link>
              <button onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          </div>
          {/* Main Content */}
          <div className="col-md-10 main-content">
            <h3 className="mt-4 mb-4">Garbage Bin Complaints</h3>
            {/* Complaints List */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Bin Photo</th>
                    <th>Location</th>
                    <th>User Name</th>
                    <th>User Phone</th>
                    <th>Bin Address</th>
                    <th>Status</th>
                    <th>Assigned Driver</th>
                    <th>Assign to Driver</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.complaintId} className={getStatusClass(complaint.status)}>
                      <td>{complaint.complaintId}</td>
                      <td>
                        <img
                          src={complaint.binPhoto}
                          alt={`Bin Photo ${complaint.id}`}
                          style={{ width: '100px', height: '100px' }}
                        />
                      </td>
                      <td>{complaint.location}</td>
                      <td>{complaint.userName}</td>
                      <td>{complaint.userPhone}</td>
                      <td>{complaint.binAddress}</td>
                      <td>{complaint.status}</td>
                      <td>{complaint.assignedDriver}</td>
                      <td>{renderAssignedDriver(complaint.complaintId)}</td>
                      <td>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-info btn-sm dropdown-toggle mx-2"
                            onClick={() => {
                              setSelectedDriver('');
                              handleShowModal();
                              setSelectedId(complaint.complaintId);

                            }}
                          >
                            <FontAwesomeIcon icon={faUserAlt} className="mx-2" /> Assign
                          </button>
                          <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                              <Modal.Title>Assign Driver</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {drivers.map((driver) => (
                                <Button
                                  key={driver}
                                  variant="primary"
                                  onClick={() => handleDriverSelection(selectedId, driver)}
                                  style={{marginLeft: 4}}
                                >
                                  {driver}
                                </Button>
                              ))}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleInProgressButtonClick(complaint.complaintId)}
                        >
                          <FontAwesomeIcon icon={faPlay} /> In Progress
                        </button>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleInResolvedButtonClick(complaint.complaintId)}
                        >
                          <FontAwesomeIcon icon={faCheck} /> Resolved
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminComplaint;
