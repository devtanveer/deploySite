import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faLocation, faBinoculars, faIdBadge, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { Link } from 'react-router-dom';

const LocationsMap = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
      logout();
      navigate('/userlogin');
    };
    const locations = [
        { name: 'Bin Location 1', address: 'Address 1', image: 'https://assets.telegraphindia.com/telegraph/f1aac7be-a694-4b6e-8246-3f38eef41cb8.gif' },
        { name: 'Bin Location 2', address: 'Address 2', image: 'https://assets.telegraphindia.com/telegraph/f1aac7be-a694-4b6e-8246-3f38eef41cb8.gif' },
        { name: 'Bin Location 3', address: 'Address 3', image: 'https://assets.telegraphindia.com/telegraph/f1aac7be-a694-4b6e-8246-3f38eef41cb8.gif' },
        { name: 'Bin Location 4', address: 'Address 4', image: 'https://assets.telegraphindia.com/telegraph/f1aac7be-a694-4b6e-8246-3f38eef41cb8.gif' },
        { name: 'Bin Location 5', address: 'Address 5', image: 'https://assets.telegraphindia.com/telegraph/f1aac7be-a694-4b6e-8246-3f38eef41cb8.gif' },
        { name: 'Bin Location 6', address: 'Address 6', image: 'https://assets.telegraphindia.com/telegraph/f1aac7be-a694-4b6e-8246-3f38eef41cb8.gif' },
    ];

    return (
        <div className="container-fluid">




<div className="row border">
        {/* Sidebar */}
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
        <h2>Locations Table</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location, index) => (
                        <tr key={index}>
                            <td>Bin Location {index + 1}</td>
                            <td>{location.address}</td>
                            <td>Latitude {index + 1}</td>
                            <td>Longitude {index + 1}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="row">
                {locations.map((location, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={location.image} alt={location.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{location.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
   
        </div>
      </div>
    </div>
  





   );          
};

export default LocationsMap;
