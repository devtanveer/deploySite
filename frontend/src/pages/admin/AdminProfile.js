import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faEdit, faSave, faTrash, faHome, faUser, faComments, faBinoculars, faIdBadge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/userlogin');
  };



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        setUsers(response.data);

        console.log('Fetched User Data:', response.data.map(user => {
          const { _id, name, email, phone, address, userId, role } = user;
          return { _id, name, email, phone, address, userId, role };
        }));

      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [roleInput, setRoleInput] = useState('');

  const handleEditClick = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);

    setNameInput(userToEdit.name);
    setEmailInput(userToEdit.email);
    setPhoneInput(userToEdit.phone);
    setAddressInput(userToEdit.address);
    setRoleInput(userToEdit.role);
    setEditingUserId(userId);
  };

  const handleSaveClick = async (userId) => {
    const updatedUserData = {
      name: nameInput,
      email: emailInput,
      phone: phoneInput,
      address: addressInput,
      userId: userId,
      role: roleInput,
    };

    console.log('Updated User Data:', JSON.stringify(updatedUserData, null, 2));

    try {
      await axios.post('http://localhost:4000/update-user', updatedUserData);
      console.log('User updated successfully!');
      setEditingUserId(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/delete-user/${userId}`);
      console.log('User deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderRoleField = (user) => {
    if (editingUserId === user._id) {
      return (
        <select
          className="form-control form-control-sm"
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
        >
          <option value="user">User</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>
      );
    } else {
      return user.role;
    }
  };

  return (
    <div className="container-fluid">
        <h2 >Admin Dashboard</h2>
      <div className="row border">
        {/* Sidebar */}
        <div id="sidebar" className="col-md-2">
          {/* <div className="sidebar-header">
            <h3>Dashboard</h3>
          </div> */}
         
         <div className="nav flex-column ">
              <Link to="/admindashboard" className="nav-link">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            
              <Link to="/adminprofile"  className="nav-link">
                <FontAwesomeIcon icon={faUser} /> Update / Delete Users
              </Link>
            
              <Link to="/complaints"  className="nav-link">
                <FontAwesomeIcon icon={faComments} /> View Complaints
              </Link>
            
              <Link to="/regions"  className="nav-link">
                <FontAwesomeIcon icon={faBinoculars} /> View Bins / Regions
              </Link>
            
              <Link to="/profile"  className="nav-link">
                <FontAwesomeIcon icon={faIdBadge} /> Admin Profile
              </Link>
            
              <button onClick={handleLogout}  >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
        </div>
        </div>


        {/* Main Content */}
        <div className="col-md-10 main-content">
          <h3 className="mt-4 mb-4">Update or Delete User Data</h3>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>UserId</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {editingUserId === user._id ? (
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    {/* Repeat similar adjustments for other input fields */}
                    <td>
                      {editingUserId === user._id ? (
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingUserId === user._id ? (
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td>
                      {editingUserId === user._id ? (
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          value={addressInput}
                          onChange={(e) => setAddressInput(e.target.value)}
                        />
                      ) : (
                        user.address
                      )}
                    </td>
                    <td>{user.userId}</td>
                    <td>{renderRoleField(user)}</td>
                    <td>
                      {editingUserId === user._id ? (
                        <>
                          <button className="btn btn-success btn-sm" onClick={() => handleSaveClick(user.userId)}>
                            <FontAwesomeIcon icon={faSave} /> Save
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(user.userId)}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(user._id)}>
                          <FontAwesomeIcon icon={faEdit} /> Update/Delete
                        </button>
                      )}
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

export default AdminProfile;
