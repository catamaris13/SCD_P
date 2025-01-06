import React from 'react';
import logo6 from '../assets/logo6.webp';
import logo5 from '../assets/logo5.webp';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.photoRow}>
        <div style={styles.photoCard}>
          <img src={logo5} alt="RocketShip logo" style={styles.photo} />
        </div>
        <div style={styles.textCard}>
          <h2 style={styles.heading}>RocketShip: Speed You Can Trust</h2>
          <p style={styles.caption}>
            At RocketShip, we prioritize speed and efficiency. Our mission is to deliver your
            packages as fast as possible, without compromising on quality. Whether near or far, we
            make sure your shipments reach their destination in record time.
          </p>
          <p style={styles.caption}>
            When every second counts, RocketShip is the solution. Our team of expert couriers ensures
            that your delivery arrives exactly when you need it, offering a fast and reliable service
            for all your shipping needs.
          </p>
        </div>
      </div>

      <div style={styles.photoRow}>
        <div style={styles.textCard}>
          <h2 style={styles.heading}>RocketShip: Fast & Reliable</h2>
          <p style={styles.caption}>
            RocketShip was built on the promise of speed and dependability. We understand the value
            of your time, and that's why we work tirelessly to provide the fastest delivery services
            in the industry. With us, your packages are always a priority.
          </p>
          <p style={styles.caption}>
            Our commitment to rapid delivery is unmatched. From local shipments to international
            destinations, RocketShip ensures that your items arrive quickly, safely, and with
            precision.
          </p>
        </div>
        <div style={styles.photoCard}>
          <img src={logo6} alt="RocketShip express delivery" style={styles.photo} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f6e0fa',
    minHeight: '100vh',
    fontFamily: "'Arial', sans-serif",
  },
  photoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap', 
  },
  photoCard: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  },
  textCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
  },
  photo: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    color: '#d783ff',
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  caption: {
    fontSize: '16px',
    color: '#004d40',
    textAlign: 'center',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
};

export default HomePage;
