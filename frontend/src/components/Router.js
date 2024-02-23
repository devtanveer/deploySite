import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import RegistrationForm from '../pages/user/RegisterPage';
import LoginPage from '../pages/user/userlogin';
import AdminLogin from '../pages/admin/adminlogin';
import DriverLogin from '../pages/driver/driverlogin';
import AdminDashboard from '../pages/admin/admindashboard';
import UserDashboard from '../pages/user/userdashboard';
import DriverDashboard from '../pages/driver/driverdashboard';
import AdminProfile from '../pages/admin/AdminProfile';  // Import the AdminProfile component
import AdminComplaint from '../pages/admin/complaints';
import BinsRegions from '../pages/admin/regions';
import ProfileUpdateUser from '../pages/admin/UpdateUser';
import ComplaintForm from './ComplaintForm';
import ComplaintsList from './ComplaintsList';
import GeneralStatistics from '../pages/admin/GeneralStatistics';
import ComplaintPage from '../pages/user/addcomplaint';
import UserProfile from '../pages/user/userprofile';
import ComplaintsListd from '../pages/driver/driversComplaints';
import LocationsMap from '../pages/driver/locationmap';
import DriverProfile from '../pages/driver/driverprofile';

const OutletOrRedirect = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/userlogin" />;
  }

  return <Outlet />;
};

const ProtectedRoute = ({ element, role }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/userlogin" />;
  }

  if (role && localStorage.getItem('role') !== role) {
    // Redirect to a default dashboard or show an unauthorized message
    return <Navigate to="/userlogin" />;
  }

  return element;
};

export default function Router() {
  const Layout = () => (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="about-us" element={<About />} />
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="/userlogin" element={<LoginPage />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          
          {/* These pages are accessible even if the user is not logged in */}
          {/* These pages are accessible only if the user is authenticated and has the required role */}
          <Route
            path="/admindashboard"
            element={<ProtectedRoute element={<AdminDashboard />} role="admin" />}
          />
          <Route
            path="/userdashboard"
            element={<ProtectedRoute element={<UserDashboard />} role="user" />}
          />
          <Route
            path="/driverdashboard"
            element={<ProtectedRoute element={<DriverDashboard />} role="driver" />}
          />
        <Route
            path="/adminprofile"
            element={<ProtectedRoute element={<AdminProfile />} role="admin" />}
          />

<Route
            path="/locationmap"
            element={<ProtectedRoute element={<LocationsMap />} role="driver" />}
          />
<Route
            path="/GeneralStatistics"
            element={<ProtectedRoute element={<GeneralStatistics />} role="admin" />}
          />
        

        <Route
            path="/complaints"
            element={<ProtectedRoute element={<AdminComplaint />} role="admin" />}
          />
    <Route
            path="/regions"
            element={<ProtectedRoute element={<BinsRegions />} role="admin" />}
          />

        <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfileUpdateUser />} role="admin" />}
          />

<Route
            path="/addcomplaint"
            element={<ProtectedRoute element={<ComplaintPage />} role="user" />}
          />

          
<Route
            path="/ComplaintsList"
            element={<ProtectedRoute element={<ComplaintsList />} role="user" />}
          />
<Route
            path="/profile-setting"
            element={<ProtectedRoute element={<DriverProfile />} role="driver" />}
          />

<Route
            path="/driverdashboard"
            element={<ProtectedRoute element={<DriverDashboard />} role="user" />}
          />

<Route
            path="/driverscomplaints"
            element={<ProtectedRoute element={<ComplaintsListd />} role="driver" />}
          />


<Route
            path="/userprofile"
            element={<ProtectedRoute element={<UserProfile />} role="user" />}
          />

        
        </Route>
        
        
      </Routes>
    </BrowserRouter>
  );
}
