import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faUser, faLocation, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import ComplaintsListd from './driversComplaints'; 

const DriverDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/userlogin');
  };



  return (
    <div className="container-fluid">
      <div className="row border">
        {/* Sidebar */}
        <h1>Driver Dashboard</h1>

        <div id="sidebar" className="col-md-2">
          <div className="nav flex-column">
            <Link to="/driverdashboard" className="nav-link"> <FontAwesomeIcon icon={faHome} /> Home</Link>
            <Link to="/locationmap" className="nav-link"><FontAwesomeIcon icon={faLocation} />Location Maps</Link>
            <Link to="/profile-setting" className="nav-link"> <FontAwesomeIcon icon={faUser} /> Profile Setting</Link>
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="col-md-10 main-content">
          <ComplaintsListd/>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
