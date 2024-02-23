import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import AdminProfile from '../pages/admin/AdminProfile';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/userlogin');
  };

  return (
    <div className="container-fluid ">
      <div className="row border">
        {/* Sidebar */}
        <div className="col-md-2 sidebar">
          <h2></h2>
          <div className="nav flex-column">
            <Link to="/userdashboard" className="nav-link">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/userprofile" className="nav-link">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            <Link to="/usercomplaints" className="nav-link">
              <FontAwesomeIcon icon={faEnvelope} /> Messages
            </Link>
            <Link to="/usersettings" className="nav-link">
              <FontAwesomeIcon icon={faCog} /> Settings
            </Link>
            <button onClick={handleLogout} className="nav-link">
              Logout
            </button>
            {/* <Link to="/dashboard/admin-profile" className="nav-link">
              Admin Profile
            </Link> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-10 main-content">
      {/* <AdminProfile/>  */}
      
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
