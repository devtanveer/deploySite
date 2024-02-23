import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faComments, faBinoculars,faTrash, faIdBadge, faSignOutAlt, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import axios from 'axios';

const BinsRegions = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [regions, setRegions] = useState([]);
  const [newRegion, setNewRegion] = useState({
    regionCode: '',
    regionName: '',
    regionDriver: '',
    driverPhone: '',
    regionStatus: 'Active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await axios.get('http://localhost:4000/bins');
      setRegions(response.data);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRegion({ ...newRegion, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!newRegion.regionCode) {
      errors.regionCode = 'Region Code is required';
    }
    if (!newRegion.regionName) {
      errors.regionName = 'Region Name is required';
    }
    if (!newRegion.regionDriver) {
      errors.regionDriver = 'Region Driver is required';
    }
    if (!newRegion.driverPhone) {
      errors.driverPhone = 'Driver Phone is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/add-bin-region', newRegion);
      setRegions([...regions, response.data]); // Assuming response.data contains the newly added region
      setNewRegion({
        regionCode: '',
        regionName: '',
        regionDriver: '',
        driverPhone: '',
        regionStatus: 'Active'
      });
      setErrors({});
      window.location.reload(); // Reload the page after confirmation

    } catch (error) {
      console.error('Error adding region:', error);
      // Display error message to the user
      alert('Failed to add region. Please try again and Add all details.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/userlogin');
  };

  const handleRegionStatusChange = async (regionCode) => {
    try {
      await axios.patch(`http://localhost:4000/bins/${regionCode}`, { regionStatus: regions.find(region => region.regionCode === regionCode).regionStatus === 'Active' ? 'Inactive' : 'Active' });
      setRegions((prevRegions) =>
        prevRegions.map((region) =>
          region.regionCode === regionCode
            ? { ...region, regionStatus: region.regionStatus === 'Active' ? 'Inactive' : 'Active' }
            : region
        )
      );
    } catch (error) {
      console.error('Error updating region status:', error);
    }
  };

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };





  const handleDeleteRegion = async (regionCode) => {
    try {
      await axios.delete(`http://localhost:4000/delete-bin-region/${regionCode}`);
      setRegions((prevRegions) =>
        prevRegions.filter((region) => region.regionCode !== regionCode)
      );
    } catch (error) {
      console.error('Error deleting region:', error);
      // Display error message to the user
      alert('Failed to delete region. Please try again.');
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
          <h3 className="mt-4 mb-4">Region Section</h3>

          {/* Add Region Button */}
          {!showForm && (
            <button className="btn btn-primary" onClick={handleShowForm}>Add Region</button>
          )}

          {/* Add Region Form */}
          {showForm && (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="regionCode" className="form-label">Region Code</label>
                <input type="text" className={`form-control ${errors.regionCode ? 'is-invalid' : ''}`} id="regionCode" name="regionCode" value={newRegion.regionCode} onChange={handleInputChange} />
                {errors.regionCode && <div className="invalid-feedback">{errors.regionCode}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="regionName" className="form-label">Region Name</label>
                <input type="text" className={`form-control ${errors.regionName ? 'is-invalid' : ''}`} id="regionName" name="regionName" value={newRegion.regionName} onChange={handleInputChange} />
                {errors.regionName && <div className="invalid-feedback">{errors.regionName}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="regionDriver" className="form-label">Region Driver</label>
                <input type="text" className={`form-control ${errors.regionDriver ? 'is-invalid' : ''}`} id="regionDriver" name="regionDriver" value={newRegion.regionDriver} onChange={handleInputChange} />
                {errors.regionDriver && <div className="invalid-feedback">{errors.regionDriver}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="driverPhone" className="form-label">Driver Phone</label>
                <input type="text" className={`form-control ${errors.driverPhone ? 'is-invalid' : ''}`} id="driverPhone" name="driverPhone" value={newRegion.driverPhone} onChange={handleInputChange} />
                {errors.driverPhone && <div className="invalid-feedback">{errors.driverPhone}</div>}
              </div>
              <button type="submit" className="btn btn-primary">Add Region</button>
            </form>
          )}
        <table className="table table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Region Code</th>
              <th>Region Name</th>
              <th>Region Driver</th>
              <th>Driver Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => (
              <tr key={region.regionCode}>
                <td>{region.regionCode}</td>
                <td>{region.regionName}</td>
                <td>{region.regionDriver}</td>
                <td>{region.driverPhone}</td>
                <td>{region.regionStatus}</td>
                <td>
                  <button
                    className={`btn btn-${region.regionStatus === 'Active' ? 'success' : 'danger'} btn-sm me-2`}
                    onClick={() => handleRegionStatusChange(region.regionCode)}
                  >
                    <FontAwesomeIcon icon={region.regionStatus === 'Active' ? faToggleOn : faToggleOff} />
                    {region.regionStatus === 'Active' ? ' Deactivate' : ' Activate'}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteRegion(region.regionCode)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};
export default BinsRegions;
