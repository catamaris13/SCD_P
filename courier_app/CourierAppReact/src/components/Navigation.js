import React from 'react';
import { Link } from 'react-router-dom';
import logo7 from '../assets/logo7.webp';

function Navigation() {
  return (
    <nav style={styles.nav}>
      <Link to="/home"> {}
        <img src={logo7} alt="Logo" style={styles.logo} />
      </Link>
      <div style={styles.rightLinks}> {}
        <Link to="/couriers" style={styles.link}>Couriers</Link>
        <Link to="/packages" style={styles.link}>Packages</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d783ff', 
    padding: '15px 20px',
    borderRadius: '5px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: '50px',
    height: 'auto',
    marginRight: '20px', 
    cursor: 'pointer', 
  },
  rightLinks: { 
    display: 'flex',
    alignItems: 'center', 
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    margin: '0 10px',
    transition: 'background-color 0.3s, transform 0.2s',
    backgroundColor: '#b366ff',
  },
};

export default Navigation;
