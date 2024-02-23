import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import jwt_decode, { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', { userId, password });
      const { token, role } = response.data;

      // Save the token and role in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on user role
      switch (role) {
        case 'admin':
          window.location.href = '/admindashboard';
          break;
        case 'user':
          window.location.href = '/userdashboard';
          break;
        case 'driver':
          window.location.href = '/driverdashboard';
          break;
        default:
          window.location.href = '/defaultdashboard';
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials. Please check your User ID and Password.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="login-form">
        <form className="contactForm" onSubmit={handleLogin}>
          <div className="form-group">
            <label><FontAwesomeIcon icon={faUser} /> User ID:</label>
            <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </div>

          <div className="form-group">
            <label><FontAwesomeIcon icon={faLock} /> Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
