import { useNavigate } from 'react-router-dom';
import logo from '../assets/wheatVisionLogo.png';
import styles from '../styles/components/Navbar.module.css';


function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <img src={logo} />
        <p>WheatVision</p>
      </div>
      

      <ul className={styles.navLinks} >
        <li><button onClick={() => navigate('/dashboard')}>DashBoard</button></li>
        <li><button onClick={() => navigate('/report')}>Report</button></li>
      </ul>      
    </nav>
  );
}

export default Navbar;