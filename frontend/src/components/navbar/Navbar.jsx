import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const imgURL = 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
 const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
    const [showDropdown, setShowDropdown] = useState(false);




  return (
<nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Blogg<span>App</span></Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/create">Write</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      {!token ? (
        <Link to="/login" className="register-btn">Sign Up</Link>
      ) : (
        <div
          className="profile-wrapper"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <img className="profile-img" src={imgURL} alt="profile" />
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
