// RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faUser, faComments, faBinoculars, faIdBadge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';


const AdminInfo = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/userlogin');
  };

  return (
    <div className="container-fluid">
      <h2 >Admin Dashboard</h2>
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
        <button onClick={handleLogout} >
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    </div>
 

   {/* Main Content */}
   <div className="col-md-10 main-content">
   <h3 className="mt-4 mb-4">Profile Section</h3>
 </div>
 </div>
    </div>
 
  );



};


export default AdminInfo;
