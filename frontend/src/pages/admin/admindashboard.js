import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faUser, faComments, faBinoculars, faIdBadge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [totalComplaints, setTotalComplaints] = useState(null);
  const [resolvedComplaints, setResolvedComplaints] = useState(null);
  const [progressComplaints, setProgressComplaints] = useState(null);
  const [totalBinsCount, setTotalBinsCount] = useState(null);
  const [totalUsersCount, setTotalUsersCount] = useState(null);
  const [totalDriversCount, setTotalDriversCount] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/userlogin');
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintsResponse = await axios.get('http://localhost:4000/complaints/count');
        const resolvedResponse = await axios.get('http://localhost:4000/complaints/resolved/count');
        const progressResponse = await axios.get('http://localhost:4000/complaints/progress/count');
        const binsResponse = await axios.get('http://localhost:4000/bins/count');
        const usersResponse = await axios.get('http://localhost:4000/users/count');
        const driversResponse = await axios.get('http://localhost:4000/drivers/count');

        setTotalComplaints(complaintsResponse.data.count);
        setResolvedComplaints(resolvedResponse.data.resolvedCount);
        setProgressComplaints(progressResponse.data.resolvedCount);
        setTotalBinsCount(binsResponse.data.totalBinsCount);
        setTotalUsersCount(usersResponse.data.totalUsersCount);
        setTotalDriversCount(driversResponse.data.totalUsersCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const complaintsData = {
    labels: ['Resolved Complaints', 'Progress Complaints', 'Total Complaints'],
    datasets: [
      {
        data: [resolvedComplaints, progressComplaints, totalComplaints],
        backgroundColor: ['#2ecc71', '#f39c12', '#e74c3c'],
      },
    ],
  };

  const binsData = {
    labels: ['Total Bins'],
    datasets: [
      {
        label: 'Total Bins',
        data: [totalBinsCount],
        backgroundColor: '#3498db',
      },
    ],
  };

  const usersData = {
    labels: ['Total Users', 'Total Drivers'],
    datasets: [
      {
        label: 'Total Users and Drivers',
        data: [totalUsersCount, totalDriversCount],
        backgroundColor: ['#9b59b6', '#34495e'],
      },
    ],
  };



  // Sample bar chart data
  const barChartData = {
    labels: ['Users', 'Drivers', 'Bins', 'Complaints'],
    datasets: [
      {
        label: 'Visual Statistics',
        data: [totalUsersCount, totalDriversCount, totalBinsCount, totalComplaints, 2, 3],
        backgroundColor: ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#f39c12'],
        borderColor: ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#f39c12'],
        borderWidth: 1,
      },
    ],
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
          <h3 className="mt-4 mb-4">General Statistics</h3>

          {/* Rectangles for statistics */}
          <div className="row">
            <div className="col-md-4">
              <div className="rectangle" style={{ backgroundColor: '#e74c3c' }}>
                <h2>Total Complaints: </h2>
                <h3>{totalComplaints === null ? 'Loading...' : totalComplaints}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rectangle" style={{ backgroundColor: '#2ecc71' }}>
                <h2>Resolved Complaints: </h2>
                <h3>{resolvedComplaints === null ? 'Loading...' : resolvedComplaints}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rectangle" style={{ backgroundColor: '#f39c12' }}>
                <h2>Progress Complaints: </h2>
                <h3>{progressComplaints === null ? 'Loading...' : progressComplaints}</h3>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="rectangle" style={{ backgroundColor: '#2ecc71' }}>
                <h2>Total Users Count: </h2>
                <h3>{totalUsersCount === null ? 'Loading...' : totalUsersCount}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rectangle" style={{ backgroundColor: '#2ecc71' }}>
                <h2>Total Drivers Count:</h2>
                <h3>{totalDriversCount === null ? 'Loading...' : totalDriversCount}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rectangle" style={{ backgroundColor: '#2ecc71' }}>
                <h2>Total Bins Count: </h2>
                <h3>{totalBinsCount === null ? 'Loading...' : totalBinsCount}</h3>
              </div>
            </div>
          </div>

          {/* Data Analytics dashboard */}
          <br />
          <h3>Data Analytics Dashboard</h3>
          <div className="row"  style={{ backgroundColor: '#ffffff' }}>
            <div className="col-md-6">
              <h4>Complaints Distribution</h4>
              <div style={{ width: '400px', height: '400px' }}>
                <Doughnut data={complaintsData} />
              </div>
            </div>
           

            
            <div className="col-md-6">
              <h4>Visual Stats</h4>
              <div style={{ width: '500px', height: '500px' }}>
                <Bar data={barChartData} />
              </div>
            </div>
          




          </div>
       
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
