import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './NavBar.css';

export default function NavBar({ displayName }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">{displayName}</div>
      <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        ☰
      </button>
      <ul className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
        <li><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink></li>
        
        {user ? (
          <>
            <li><NavLink to="/projects" onClick={() => setOpen(false)}>Tasks</NavLink></li>
            <li className="navbar__user-email">{user.email}</li>
            <li><button onClick={handleLogout} className="button button--small">Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink></li>
            <li><NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}
