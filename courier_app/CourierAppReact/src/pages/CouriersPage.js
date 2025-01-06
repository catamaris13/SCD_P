import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCouriers, deleteCourier } from '../services/api';

function CouriersPage() {
  const [couriers, setCouriers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCouriers() {
      try {
        const { data } = await getAllCouriers();
        setCouriers(data);
      } catch (error) {
        console.error('Error fetching couriers:', error);
      }
    }
    fetchCouriers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this courier?')) {
      try {
        await deleteCourier(id);
        setCouriers(couriers.filter(courier => courier.id !== id));
      } catch (error) {
        console.error('Error deleting courier:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        All Couriers
        <Link to="/register" style={styles.addButton}>Add Courier</Link>
      </h2>

      {couriers.length === 0 ? (
        <p style={styles.emptyMessage}>No couriers available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Manager ID</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((courier) => (
              <tr key={courier.id} style={styles.tr}>
                <td style={styles.td}>{courier.id}</td>
                <td style={styles.td}>{courier.name}</td>
                <td style={styles.td}>{courier.email}</td>
                <td style={styles.td}>
                  {courier.managerId ? courier.managerId : 'N/A'}
                </td>
                <td style={styles.actionsCell}>
                  <div style={styles.actionsContainer}>
                    <Link 
                      to={`/courier/${courier.id}/packages`} 
                      style={styles.showButton}
                    >
                      Show Packages
                    </Link>
                    <Link 
                      to={`/edit-courier/${courier.id}`} 
                      style={styles.editButton}
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(courier.id)} 
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Navigation Buttons */}
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/couriers/withoutPending')} style={styles.navButton}>
          View Couriers Without Pending Packages
        </button>
        <button onClick={() => navigate('/couriers/managers/deliveredCount')} style={styles.navButton}>
          View Managers and Delivered Package Count
        </button>
        <button onClick={() => navigate('/couriers/managers/deliveredPackages')} style={styles.navButton}>
          View Managers with Delivered Packages
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f6e0fa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: '18px',
    color: '#888',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    padding: '10px',
    backgroundColor: '#b366ff',
    color: 'white',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  tr: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  actionsCell: {
    border: '1px solid #ddd',
    padding: '0', 
    textAlign: 'center',
    width: '300px', 
    paddingLeft: '10px', 
    paddingRight: '10px', 
  },
  actionsContainer: {
    display: 'flex',
    gap: '4px',
    justifyContent: 'center',
  },
  showButton: {
    padding: '3px 6px',
    backgroundColor: '#28a745', 
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '12px',
    minWidth: '45px',
  },
  editButton: {
    padding: '3px 6px',
    backgroundColor: '#f4c542', 
    color: 'black',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '12px',
    minWidth: '45px',
  },
  deleteButton: {
    padding: '3px 6px',
    backgroundColor: '#dc3545', 
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    minWidth: '45px',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#b366ff',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
};

export default CouriersPage;
