import { useNavigate } from 'react-router-dom';
import logo from '../assets/wheatVisionLogo.png';
import './styles/navbarStyles.css';
import './styles/mediaQR-1200/navbarStyle-1200.css'
import './styles/mediaQR-1024/navbarStyle-1024.css'
import './styles/mediaQR-768/navbarStyle-768.css'
import './styles/mediaQR-480/navbarStyle-480.css'

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className='navbar'>
      <div className='logo' onClick={() => navigate('/')}>
        <img src={logo} />
        <p>WheatVision</p>
      </div>
      

      <ul className='navLinks' id='navLinks'>
        <li><button onClick={() => navigate('/dashboard')}>DashBoard</button></li>
        <li><button onClick={() => navigate('/report')}>Report</button></li>
      </ul>      
    </nav>
  );
}

export default Navbar;