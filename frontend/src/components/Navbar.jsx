import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/navbarStyles.css';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  

  return (
    <nav className='navbar'>
      <h1 onClick={() => {navigate('/'); setMenuOpen(false);}}>WheatVision</h1>

      <ul className='navLinks' id='navLinks'>
        <li><button onClick={() => {navigate('/dashboard'); setMenuOpen(false);}}>DashBoard</button></li>
        <li><button onClick={() => {navigate('/report'); setMenuOpen(false);}}>Report</button></li>
      </ul>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} role="button" aria-label="Toggle menu">
        ☰
      </div>

      {menuOpen && (
        <ul className='responsive-navlinks'>
            <li><button onClick={() => {navigate('/dashboard'); setMenuOpen(false);}}>DashBoard</button></li>
            <li><button onClick={() => {navigate('/report'); setMenuOpen(false);}}>Report</button></li>
        </ul>
      )}

      
    </nav>
  );
}

export default Navbar;