// RegisterPage.js
import React from 'react';
import ComplaintForm from '../../components/ComplaintForm';
import { faHome, faUser, faComments, faBinoculars, faIdBadge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { Link } from 'react-router-dom';

const ComplaintPage = () => {
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
        <div id="sidebar" className="col-md-2">
        <h1>User Dashboard</h1>
          <div className="nav flex-column">
          <Link to="/userdashboard" className="nav-link"> <FontAwesomeIcon icon={faHome} /> Home</Link>
            <Link to="/addcomplaint" className="nav-link"><FontAwesomeIcon icon={faComments} />Register Complaint</Link>
            <Link to="/userprofile" className="nav-link"> <FontAwesomeIcon icon={faUser} /> Profile Setting</Link>
               <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="col-md-10 main-content">
        <ComplaintForm />        

</div>
      </div>
    </div>
  );
};

export default ComplaintPage;



