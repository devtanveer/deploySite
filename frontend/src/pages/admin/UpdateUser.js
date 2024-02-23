import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faHome, faUser, faComments, faBinoculars, faIdBadge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import axios from 'axios';

const ProfileUpdateUser = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
  
    const handleLogout = () => {
      logout();
      navigate('/userlogin');
    };  
  
    const initialUserData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123',
    };

    const [userData, setUserData] = useState(initialUserData);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:4000/update-username', {
          userId: userData.userId, // Assuming you have userId stored in userData
          newUsername: userData.username // Pass the new username to the backend
        });
        console.log('Username updated successfully:', response.data);
        // Optionally, navigate to another page or display a success message
      } catch (error) {
        console.error('Error updating username:', error);
        // Handle error, display error message, etc.
      }
    };

    return (
      <div className="container-fluid">
        <h2>Admin Dashboard</h2>
        <div className="row border">
          {/* Sidebar */}
          <div id="sidebar" className="col-md-2">
            <div className="nav flex-column">
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
            <h3 className="mt-4 mb-4">Update Admin Data</h3>

            {/* User Profile Form */}
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              {/* Add more fields as needed */}
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default ProfileUpdateUser;
